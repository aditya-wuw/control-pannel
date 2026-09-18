"use client";

import { Toaster } from "sonner";

export default function Toast() {
  return (
    <div>
      <Toaster duration={3000} position="top-right" visibleToasts={1} />
      {/*<Button onClick={() => toast.error("h")}> hello </Button>*/}
    </div>
  );
}
