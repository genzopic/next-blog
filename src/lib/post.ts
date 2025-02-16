import { prisma } from "@/lib/prisma";

// 記事を全件取得する
export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// 記事を１件取得
export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

// 記事を検索
export async function searchPosts(search: string) {
  // 全角スペースを半角スペースに変換しつつスペースで分割（空文字などを除外）
  const decodedSearch = decodeURIComponent(search);
  const normalizedSearch = decodedSearch.replace(/[\s　]+/g, " ").trim();
  const searchWords = normalizedSearch.split(" ").filter(Boolean);

  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  return await prisma.post.findMany({
    where: { AND: filters },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
