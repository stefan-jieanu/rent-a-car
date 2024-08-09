import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle,
  Footer, FooterCopyright, FooterLink, FooterLinkGroup,
  Button
} from "flowbite-react";
import AuthButton from './ui/AuthButton.server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent A Car",
  description: "Car renting, for migrating",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar fluid rounded>
          <NavbarBrand as={Link} href="/">
            {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
            <span className="whitespace-nowrap text-xl font-semibold">Rent A Car</span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="/" active>
              Home
            </NavbarLink>
            <NavbarLink href="/dashboard">Dashboard</NavbarLink>
          </NavbarCollapse>
          <div className='flex md:order-2'>
            <AuthButton />
          </div>
        </Navbar>

        <div className='container mx-auto'>
          {children}
        </div>

        <Footer container>
          <FooterCopyright href="#" by="Flowbite™" year={2022} />
          <FooterLinkGroup >
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </Footer>
      </body>
    </html>
  );
}

