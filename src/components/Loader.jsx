import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
  return (
    <section className="fixed h-screen w-full bg-auth bg-themePurple bg-cover bg-no-repeat z-[100] flex justify-center items-center">
      <CirclesWithBar width={100} height={100} color="white" visible={true} />
    </section>
  );
}
