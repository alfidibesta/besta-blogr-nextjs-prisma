//? import { getSession } from 'next-auth/react';
// ambil email dari body

import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, authorEmail } = req.body; // Menambahkan authorEmail sebagai bagian dari data body

  try {
    // Mengambil informasi author dari basis data berdasarkan email yang diberikan
    const author = await prisma.user.findUnique({
      where: {
        email: authorEmail
      }
    });

    // Membuat post dan menambahkan author secara manual
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { id: author.id } } // Menghubungkan post dengan author yang telah ditemukan
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}
