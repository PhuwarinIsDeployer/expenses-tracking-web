import { NextApiRequest, NextApiResponse } from 'next'
import { auth, db } from '@/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user

    // บันทึกข้อมูลผู้ใช้ใน Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date(),
    })

    // ส่ง response กลับไปยังฝั่ง client
    return res.status(200).json({
      message: 'User registered successfully',
      user: {
        uid: user.uid,
        email: user.email,
      },
    })
  } catch (error: any) {
    console.error('Error during registration:', error)
    return res.status(500).json({ error: error.message })
  }
}
