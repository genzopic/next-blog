import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  // パスワードを暗号化して用意
  const hashedPassword = await bcrypt.hash("password123", 12); // 暗号化
  // ダミー画像URLを２つ用意
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
  ];

  // ユーザーとポストを作成
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword, // 暗号化したパスワード
      posts: {
        create: [
          {
            title: "はじめてのブログ投稿",
            content:
              "これは最初のブログ投稿です。Next.jsとPrismaを使って作成しました。",
            topImage: dummyImages[0],
            published: true,
          },
          {
            title: "２番目のブログ投稿",
            content:
              "ブログの機能を少しずつ追加していきます。認証機能やダッシュボードなども実装予定です。",
            topImage: dummyImages[1],
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e); // エラーを表示
    process.exit(1); // プロセスを終了
  })
  .finally(async () => {
    await prisma.$disconnect(); // Prismaクライアントを切断
  });
