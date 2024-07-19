"use client";

import * as React from "react";
import { useConfigStore } from "@/stores";
import { useAuth } from "@/hooks/auth";

export function InfoContent() {
  const { user, code, domain } = useConfigStore();
  const { data: info, isLoading, error } = useAuth(user, code);
  if (!error && !info) return "加载中...";

  const infos = []
  if (info.code === 0) {
    const data = info.data
    if (data.created_by) {
      const item = `本工具由302.AI用户 ${data.created_by} 创建, 302.AI是一个AI生成和分享的平台，可以一键生成自己的AI工具`
      infos.push(item)
    }
    // if (data.model_name) {
    //   const item = `本工具使用的模型为 <${data.model_name}>`
    //   infos.push(item)
    // }
    if (data.limit_cost) {
      const item = `本工具的总限额为 <${data.limit_cost}PTC>, 已经使用 <${data.cost}PTC>`
      infos.push(item)
    }
    if (data.limit_daily_cost) {
      const item = `本工具的单日限额为 <${data.limit_daily_cost}PTC>, 已经使用 <${data.current_date_cost}PTC>`
      infos.push(item)
    }
    if (data) {
      const item = `本工具的生成记录均保存在本机，不会被上传，生成此工具的用户无法看到你的生成记录`
      infos.push(item)
    }
    if (data) {
      const item = `更多信息请访问： ${domain}`
      infos.push(item)
    }
  }

  return (
    <ul className="text-sm space-y-1">
      {
        infos.map((info, idx) => {
          return info ? <li key={idx}>
            {idx + 1 + ". "}
            {info.split(" ").map((word, index) => {
              const urlPattern = /(https?:\/\/[^\s]+)/g;
              if (urlPattern.test(word)) {
                return (
                  <a
                    key={index}
                    href={word}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#7728f5]"
                  >
                    {"302.AI "}
                  </a>
                );
              }
              const namePattern = /</g;
              if (namePattern.test(word)) {
                return <b key={index}>{word.replace('<', '').replace('>', '') + " "}</b>
              }
              return word + " ";
            })}
          </li> : null
        })
      }
    </ul>
  );
}
