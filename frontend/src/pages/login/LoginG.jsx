import '../components/LoginG.css';

function LoginG() {
    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <h1>Welcome to Our Website</h1>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Form Section */}
                <section className="form-section">
                    <h2 className="form-heading">Login</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            required
                        />
                        <button type="submit" className="form-button">
                            Login
                        </button>
                    </form>
                </section>

                {/* Image Section */}
                <section className="image-section"></section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 Your Website. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default LoginG;
