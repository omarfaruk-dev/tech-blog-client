export default function Footer() {
    return (
        <footer className="footer items-center justify-center  p-6 bg-base-100 text-sm text-neutral border-t flex flex-col md:flex-row gap-6">
            <div>
                © {new Date().getFullYear()} Tech Blog. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <a className="link link-hover">Help</a>
                <a className="link link-hover">Status</a>
                <a className="link link-hover">About</a>
                <a className="link link-hover">Careers</a>
                <a className="link link-hover">Blog</a>
                <a className="link link-hover">Text to speech</a>
            </div>
        </footer>
    );
}
