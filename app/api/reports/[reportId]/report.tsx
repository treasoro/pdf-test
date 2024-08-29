"use client";

import { cn, downloadUrl } from '@/lib/utils';

interface ReportProps {
  report: {
    id: number;
    name: string;
    dateCreated: number;
    value: number;
    description: string;
    status: string;
    customer: {
      name: string;
      email: string;
    }
  };
}

const Report = ({ report }: ReportProps) => {

  async function handleOnClick() {


    const { resource } = await fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({
        // Unauthenticated, public page
        siteUrl: 'http://localhost:3000/'
      })
    }).then(r => r.json())

    downloadUrl(resource.secure_url, 'invoice.pdf')
  }

  return (
    <h1>This is my report</h1>
  );
}

export default Report;