// src/components/Footer.tsx
import {
    FaGithub, FaLinkedin, FaDiscord,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const socialLinks = [
    { label: "GitHub",      href: "https://github.com/refatalhasankaif",                    Icon: FaGithub },
    { label: "LinkedIn",    href: "https://www.linkedin.com/in/refatkaif/",                  Icon: FaLinkedin },
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

                    {/* Bottom row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 text-xs text-gray-400">
                        <p>© {year} Refat al hasan. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    title={label}
                                    className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;