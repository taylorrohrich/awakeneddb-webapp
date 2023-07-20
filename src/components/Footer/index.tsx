import { SITE_NAME } from "@/constants/site";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex-shrink-0 h-16 px-10 flex items-center border-t gap-6">
      <Link
        aria-label="Github Link"
        href="https://github.com/taylorrohrich/awakeneddb-webapp"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} className="text-2xl" />
      </Link>
      <div className="text-xs">
        {SITE_NAME} is unofficial Fan Content. Not approved/endorsed by Warner
        Bros. Entertainment Inc. Portions of the materials used are property of
        Warner Bros. Entertainment Inc.
      </div>
    </footer>
  );
}
