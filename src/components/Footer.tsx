// src/components/Footer.tsx
import {
    FaGithub, FaLinkedin, FaDiscord,
    FaYoutube, FaInstagram, FaFacebook,
    FaPinterest, FaMedium,
} from "react-icons/fa";
import { FaXTwitter, FaBluesky } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const socialLinks = [
    { label: "GitHub",      href: "https://github.com/refatalhasankaif",                    Icon: FaGithub },
    { label: "LinkedIn",    href: "https://www.linkedin.com/in/refatkaif/",                  Icon: FaLinkedin },
    { label: "X",           href: "https://x.com/refatalhasank",                             Icon: FaXTwitter },
    { label: "Facebook",    href: "https://www.facebook.com/refatahkaif",                    Icon: FaFacebook },
    { label: "Instagram",   href: "https://www.instagram.com/mdrefatahkaif/",               Icon: FaInstagram },
    { label: "YouTube",     href: "https://www.youtube.com/@refatalhasan",                   Icon: FaYoutube },
    { label: "Pinterest",   href: "https://www.pinterest.com/refatalhasankaif/",             Icon: FaPinterest },
    { label: "Medium",      href: "https://refatalhasan.medium.com/",                        Icon: FaMedium },
    { label: "Bluesky",     href: "https://bsky.app/profile/refatalhasan.bsky.social",       Icon: FaBluesky },
    { label: "Discord",     href: "https://discord.com/users/1472431179637723280",           Icon: FaDiscord },
    { label: "LeetCode",    href: "https://leetcode.com/u/mdrefatahk/",                     Icon: SiLeetcode },
    { label: "Codeforces",  href: "https://codeforces.com/profile/mdrefatahk",               Icon: SiCodeforces },
    { label: "CodeChef",    href: "https://www.codechef.com/users/mdrefatahk",               Icon: SiCodechef },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-200/70 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col items-center gap-6">

                    {/* Social Icons Grid */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {socialLinks.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm text-gray-400 hover:text-gray-700 transition-all duration-200 text-xs font-medium">
                                <Icon size={14} />
                                <span className="hidden sm:inline">{label}</span>
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-200/80" />

                    {/* Bottom row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 text-xs text-gray-400">
                        <p>© {year} Refat al hasan. All rights reserved.</p>
                        <p>Built with React.js · TailwindCSS</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;