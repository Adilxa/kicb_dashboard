import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import DashboardLayoutComponent from '@/components/layout/dashboard-layout';
import Header from '@/components/layout/header';
import Provider from '@/providers/provider';

export const metadata: Metadata = {
  title: 'KICB',
  description: 'KICB',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <DashboardLayoutComponent>
              <div>{children}</div>
            </DashboardLayoutComponent>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
