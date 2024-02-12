"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <h2>해당 포스팅은 없는 포스팅입니다.</h2>
    </div>
  );
}
