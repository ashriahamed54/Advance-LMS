import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, arrayUnion } from 'firebase/firestore';

// Function to generate a random enrollment key
export function generateEnrollmentKey() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Function to create a new course
export async function createCourse(courseData: any, tutorId: string) {
  const enrollmentKey = generateEnrollmentKey();
  const courseWithKey = { 
    ...courseData, 
    enrollmentKey, 
    tutorId,
    enrolledStudents: [] 
  };
  const docRef = await addDoc(collection(db, 'courses'), courseWithKey);
  return { id: docRef.id, ...courseWithKey };
}

// Function to enroll a student in a course
export async function enrollStudent(enrollmentKey: string, studentId: string) {
  const coursesRef = collection(db, 'courses');
  const q = query(coursesRef, where('enrollmentKey', '==', enrollmentKey));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('Invalid enrollment key');
  }

  const courseDoc = querySnapshot.docs[0];
  const courseId = courseDoc.id;
  const courseData = courseDoc.data();

  if (courseData.enrolledStudents.includes(studentId)) {
    throw new Error('Student already enrolled in this course');
  }

  await updateDoc(doc(db, 'courses', courseId), {
    enrolledStudents: arrayUnion(studentId)
  });

  return { courseId, courseTitle: courseData.title };
}

// Function to get enrolled students for a course
export async function getEnrolledStudents(courseId: string) {
  const courseRef = doc(db, 'courses', courseId);
  const courseSnap = await getDoc(courseRef);

  if (courseSnap.exists()) {
    const courseData = courseSnap.data();
    const studentIds = courseData.enrolledStudents || [];
    const studentsSnap = await getDocs(query(collection(db, 'users'), where('id', 'in', studentIds)));
    return studentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  return [];
}

// Function to get courses for a tutor
export async function getTutorCourses(tutorId: string) {
  const coursesSnap = await getDocs(query(collection(db, 'courses'), where('tutorId', '==', tutorId)));
  return coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Function to get courses for a student
export async function getStudentCourses(studentId: string) {
  const coursesSnap = await getDocs(query(collection(db, 'courses'), where('enrolledStudents', 'array-contains', studentId)));
  return coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

