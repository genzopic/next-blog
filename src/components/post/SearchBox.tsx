"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [deboundedSearch, setDeboundedSearch] = useState("");
  const router = useRouter();

  // デバウンス（高頻度に呼び出されるのを防ぐ500ms後に実行）
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // deboundedSearchが変更されたら実行
  useEffect(() => {
    if (deboundedSearch.trim()) {
      router.push(`/?search=${deboundedSearch.trim()}`);
    } else {
      router.push("/");
    }
  }, [deboundedSearch, router]);

  return (
    <>
      <Input
        placeholder="記事を検索"
        className="w-[200px] lg:w-[300px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
