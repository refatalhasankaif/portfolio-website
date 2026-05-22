// src/components/Footer.tsx
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const socialLinks = [
    { label: "GitHub", href: "https://github.com/refatalhasankaif", Icon: FaGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/refatkaif/", Icon: FaLinkedin },
    { label: "X", href: "https://x.com/refatalhasank", Icon: FaXTwitter },
    { label: "Discord", href: "https://discord.com/users/1472431179637723280", Icon: FaDiscord },
    { label: "LeetCode", href: "https://leetcode.com/u/mdrefatahk/", Icon: SiLeetcode },
    { label: "Codeforces", href: "https://codeforces.com/profile/mdrefatahk", Icon: SiCodeforces },
    { label: "CodeChef", href: "https://www.codechef.com/users/mdrefatahk", Icon: SiCodechef },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-200/70 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p className="text-center sm:text-left">
                        © {year} Refat al hasan. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ label, href, Icon }) => (
                            <a                                          // ← this line was missing
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                                className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;