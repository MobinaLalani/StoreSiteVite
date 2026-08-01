import { Link, type LinkProps } from "react-router-dom";

type AppLinkProps = Omit<LinkProps, "to"> & { href: string };

export default function AppLink({ href, ...props }: AppLinkProps) {
  return <Link to={href} {...props} />;
}
