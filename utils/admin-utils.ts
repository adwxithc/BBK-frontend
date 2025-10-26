/**
 * Utility functions for admin-related operations
 */

/**
 * Truncates an email address to a specified maximum length
 * @param email - The email address to truncate
 * @param maxLength - Maximum length for the email (default: 20)
 * @returns Truncated email string
 */
export const truncateEmail = (
    email: string,
    maxLength: number = 20
): string => {
    if (email.length <= maxLength) return email;

    const [localPart, domain] = email.split('@');
    if (localPart.length > maxLength - 8) {
        return `${localPart.substring(0, maxLength - 8)}...@${domain}`;
    }
    return email;
};

/**
 * Gets the page title from the admin path
 * @param path - The current pathname
 * @returns Formatted page title
 */
export const getPageTitle = (path: string): string => {
    if (path === '/admin') return 'Dashboard Overview';
    const segment = path.split('/admin/')[1];
    if (!segment) return 'Dashboard Overview';

    // Handle special cases
    if (segment === 'event-categories') return 'Event Categories';

    return segment.charAt(0).toUpperCase() + segment.slice(1);
};

/**
 * Gets the page description from the admin path and user data
 * @param path - The current pathname
 * @param userName - Optional user name for personalization
 * @returns Formatted page description
 */
export const getPageDescription = (path: string, userName?: string): string => {
    if (path === '/admin') {
        return userName
            ? `Welcome back, ${userName}! Here's your admin dashboard`
            : 'Welcome to your admin dashboard';
    }
    const segment = path.split('/admin/')[1];
    if (!segment) {
        return userName
            ? `Welcome back, ${userName}! Here's your admin dashboard`
            : 'Welcome to your admin dashboard';
    }

    // Handle special cases
    if (segment === 'event-categories') {
        return 'Manage event categories like Sports Day, Annual Day, and more';
    }
    if (segment === 'events') {
        return 'Create and manage specific events with photos and details';
    }

    return `Manage your ${segment} efficiently`;
};

// Helper to generate unique identifier for each file/part
export const generateUniqueId = () =>
    Math.random().toString(36).substring(2) + Date.now().toString(36);

// Upload file to S3 using presigned URL
export const uploadFileToS3 = async (
    file: File,
    uploadUrl: string,
    onProgress?: (progress: number) => void
): Promise<{ success: boolean; error?: string }> => {
    try {
        const xhr = new XMLHttpRequest();

        return new Promise((resolve) => {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const progress = Math.round(
                        (event.loaded / event.total) * 100
                    );
                    onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200 || xhr.status === 204) {
                    resolve({ success: true });
                } else {
                    resolve({
                        success: false,
                        error: `Upload failed with status: ${xhr.status}`,
                    });
                }
            });

            xhr.addEventListener('error', () => {
                resolve({
                    success: false,
                    error: 'Network error during upload',
                });
            });

            xhr.open('PUT', uploadUrl);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file);
        });
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

export async function uploadMultipartFileToS3(
  file: File,
  parts: { partNumber: number; url: string }[],
  onProgress?: (progress: number) => void
): Promise<{
  success: boolean;
  parts: { PartNumber: number; ETag: string }[];
  error?: string;
}> {
  try {
    const partSize = Math.ceil(file.size / parts.length);
    let uploaded = 0;
    const uploadedParts: { PartNumber: number; ETag: string }[] = [];

    // Create all part promises
    const partPromises = parts.map((partInfo, i) => {
      const { url, partNumber } = partInfo;
      const start = i * partSize;
      const end = Math.min(start + partSize, file.size);
      const partBlob = file.slice(start, end);

      return new Promise<{ PartNumber: number; ETag: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            uploaded += event.loaded;
            const progress = Math.round((uploaded / file.size) * 100);
            onProgress(progress);
          }
        });
        xhr.onload = () => {
          const etag = xhr.getResponseHeader('ETag');
          if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
            resolve({ PartNumber: partNumber, ETag: etag || '' });
          } else {
            reject(`Part ${i + 1} upload failed: ${xhr.status}`);
          }
        };
        xhr.onerror = () => reject(`Part ${i + 1} upload failed: network error`);
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(partBlob);
      });
    });

    // Wait for all parts to upload in parallel
    const results = await Promise.all(partPromises);
    uploadedParts.push(...results);

    return { success: true, parts: uploadedParts };
  } catch (error) {
    console.error('Multipart upload error:', error);
    return {
      success: false,
      parts: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
