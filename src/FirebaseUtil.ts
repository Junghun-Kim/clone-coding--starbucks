import { collection, Firestore, getDocs } from "firebase/firestore"

// 파일을 Base64 문자열로 변환하는 함수
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file) // 파일을 Base64로 변환
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

// Firestore에서 Base64 이미지 가져오기
export const fetchBase64Images = async (
  db: Firestore
): Promise<ImageData[]> => {
  const querySnapshot = await getDocs(collection(db, "images"))
  return querySnapshot.docs.map((doc) => ({
    ...(doc.data() as ImageData),
    timestamp: new Date(doc.data().timestamp), // Firestore timestamp 변환
  }))
}
