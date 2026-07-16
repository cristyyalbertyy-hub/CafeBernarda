"use client";

import CollectionSection from "@/components/CollectionSection";
import InquiryForm from "@/components/InquiryForm";
import { SilkProvider } from "@/components/SilkProvider";
import { collections } from "@/lib/collections";

export default function SalonCollections() {
  return (
    <SilkProvider>
      {collections.map((collection, index) => (
        <CollectionSection
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}

      <section
        className="section section--divider"
        id="enquire"
        aria-labelledby="reserve-heading"
      >
        <div className="container container--narrow">
          <InquiryForm />
        </div>
      </section>
    </SilkProvider>
  );
}
