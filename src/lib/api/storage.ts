import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadReviewImage = async (file: File, productId: string, userId: string): Promise<string> => {
  try {
    // 파일 확장자 추출
    const extension = file.name.split('.').pop();
    
    // 파일명 생성: reviews/productId/userId_timestamp.extension
    const fileName = `reviews/${productId}/${userId}_${Date.now()}.${extension}`;
    const storageRef = ref(storage, fileName);

    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);
    
    // 다운로드 URL 반환
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    throw new Error('이미지를 업로드할 수 없습니다.');
  }
};

export const uploadReviewImages = async (files: File[], productId: string, userId: string): Promise<string[]> => {
  try {
    const uploadPromises = Array.from(files).map(file => 
      uploadReviewImage(file, productId, userId)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    throw new Error('이미지를 업로드할 수 없습니다.');
  }
}; 