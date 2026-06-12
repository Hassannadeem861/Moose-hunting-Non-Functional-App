import { Platform } from 'react-native';
import { apiHandle } from '../config/apiHandle';

const isIos = Platform.OS === 'ios';

const getMimeTypeFromFileName = fileName => {
  const extension = fileName?.split('.').pop()?.toLowerCase();
  const mimeMap = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    csv: 'text/csv',
    txt: 'text/plain',
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
  };
  return mimeMap[extension] || null;
};

export const imageUploader = async (file, setLoading = () => {}) => {
  try {
    console.log('[imageUploader:v2] start');
    console.log('Received Media File:', file);
    setLoading(true);

    if (!file || !file.uri) {
      throw new Error('No file selected for upload.');
    }

    const providedType = file?.type || '';
    const guessedTypeFromName = getMimeTypeFromFileName(file?.fileName);
    const resolvedType = providedType || guessedTypeFromName || 'application/octet-stream';
    const isVideo = resolvedType.includes('video');
    const isImage = resolvedType.includes('image');

    const fileType =
      resolvedType ||
      (isVideo
        ? 'video/mp4'
        : isImage
        ? 'image/jpeg'
        : 'application/octet-stream');

    const fallbackExtension = isVideo
      ? 'mp4'
      : isImage
      ? 'jpg'
      : fileType.includes('pdf')
      ? 'pdf'
      : 'bin';

    const fileName = file.fileName || `media_${Date.now()}.${fallbackExtension}`;

    // Android document picker usually returns content:// URIs; keep them unchanged.
    const cleanUri =
      file.uri?.startsWith('content://') ||
      file.uri?.startsWith('file://') ||
      isIos
        ? file.uri
        : `file://${file.uri}`;

    const formData = new FormData();
    formData.append('file', {
      uri: cleanUri,
      name: fileName,
      type: fileType,
    });

    console.log('Uploading with:', {
      uri: cleanUri,
      name: fileName,
      type: fileType,
    });

    const response = await apiHandle.post('/upload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      timeout: 30000,
    });

    console.log('Upload response:', response.data);

    const mediaUrl = response?.data?.url;
    if (!mediaUrl) {
      throw new Error('Upload failed: No URL returned from server');
    }

    return mediaUrl;
  } catch (error) {
    console.error(
      'Upload error details:',
      error.response?.data || error.message,
    );

    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please login again.');
    } else if (error.response?.status === 413) {
      throw new Error('File too large. Please select a smaller file.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Upload timed out. Please check your connection.');
    } else {
      throw new Error(error.message || 'Upload failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};
