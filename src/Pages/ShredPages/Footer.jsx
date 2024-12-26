import icons from "../../assets/icons/icons.png";

const Footer = () => {
    return (
        <div className="bg-gray-900 bg-cover bg-center w-full pt-24">
            <footer className="footer text-gray-200 p-10 flex flex-col lg:flex-row justify-between items-start">
                <aside className="flex flex-col items-center lg:items-start lg:w-1/4 mb-6 lg:mb-0">
                    <img className="w-28" src={icons} alt="VolunSphere" />
                    <p className="text-center lg:text-left mt-4">
                        VolunSphere Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav className="flex flex-col lg:w-1/4 mb-6 lg:mb-0">
                    <h6 className="footer-title text-center lg:text-left">Company</h6>
                    <a className="link link-hover text-center lg:text-left">About us</a>
                    <a className="link link-hover text-center lg:text-left">Contact</a>
                    <a className="link link-hover text-center lg:text-left">Jobs</a>
                    <a className="link link-hover text-center lg:text-left">Press kit</a>
                </nav>
                <nav className="flex flex-col lg:w-1/4 mb-6 lg:mb-0">
                    <h6 className="footer-title text-center lg:text-left">Legal</h6>
                    <a className="link link-hover text-center lg:text-left">Terms of use</a>
                    <a className="link link-hover text-center lg:text-left">Privacy policy</a>
                    <a className="link link-hover text-center lg:text-left">Cookie policy</a>
                </nav>
                <form className="flex flex-col items-center lg:w-1/4">
                    <h6 className="footer-title text-center lg:text-left">Newsletter</h6>
                    <fieldset className="form-control w-full lg:w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join w-full">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item w-1/2 sm:w-3/4 lg:w-1/2" />
                            <button className="btn btn-primary join-item mt-2 sm:mt-0 w-full sm:w-auto lg:w-auto">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
            <div className="divider divider-neutral"></div>
            <aside className="text-center text-gray-200 pb-6">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </aside>
        </div>
    );
};

export default Footer;
