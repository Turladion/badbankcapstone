function NavBar() {
  const user = React.useContext(UserContext);
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
      <a className="navbar-brand" href="#">
        <img src="bank.png" className="logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">
              Deposit
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">
              Withdraw
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">
              Balance
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">
              AllData
            </a>
          </li>
        </ul>
        <div className="ml">
          {user.user === null ? (
            <>
              <ul className="navbar-nav" style={{gap:'5px'}}>
                <li className="nav-item">
                  <a className="btn btn-primary" href="#/CreateAccount/">
                    Create Account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-secondary" href="#/login/">
                    Login
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              {user.user.name}
              <button
                className="btn btn-light"
                onClick={() => {
                  user.setUser(null);
                }}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
