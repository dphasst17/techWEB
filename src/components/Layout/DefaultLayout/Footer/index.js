
function Footer() {
    return <footer className="flex flex-col space-y-10 justify-center m-10 pb-40">

    <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <div className="hover:text-gray-900 transition-all cursor-pointer">Home</div>
        <div className="hover:text-gray-900 transition-all cursor-pointer">About</div>
        <div className="hover:text-gray-900 transition-all cursor-pointer">Services</div>
        <div className="hover:text-gray-900 transition-all cursor-pointer">Media</div>
        <div className="hover:text-gray-900 transition-all cursor-pointer">Gallery</div>
        <div className="hover:text-gray-900 transition-all cursor-pointer">Contact</div>
    </nav>

    <div className="flex justify-center space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="img"/>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="img"/>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="img"/>
        </a>
        <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" alt="img"/>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="img"/>
        </a>
    </div>
    <div className="text-center text-gray-700 font-medium">&copy;D-Phat</div>
</footer>;
}

export default Footer;