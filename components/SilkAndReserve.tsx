"use client";

import InquiryForm from "@/components/InquiryForm";
import { SilkProvider } from "@/components/SilkProvider";
import GestureSection from "@/components/GestureSection";

export default function SilkAndReserve() {
  return (
    <SilkProvider>
      <GestureSection />
      <section className="section" id="enquire" aria-labelledby="reserve-heading">
        <div className="container container--narrow">
          <InquiryForm />
        </div>
      </section>
    </SilkProvider>
  );
}
