function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");

  const user = React.useContext(UserContext);

  return (
    <>
      {user.user === null ? (
        <Card
          bgcolor="info"
          header="Unauthorized"
          body={<h5>Login First!</h5>}
        />
      ) : (
        <Card
          bgcolor="info"
          header="Balance"
          body={
            <BalanceMsg
              setShow={setShow}
              setStatus={setStatus}
              setBalance={setBalance}
              balance={balance}
            />
          }
        />
      )}
    </>
  );
}

function BalanceMsg(props) {
  const user = React.useContext(UserContext);
  const email = user.user.email;
  fetch(`/account/findOne/${email}`)
    .then((response) => response.text())
    .then((text) => {
      try {
        const data = JSON.parse(text);
        props.setStatus(text);
        props.setShow(false);
        props.setBalance(data.balance);
        console.log("JSON:", data);
      } catch (err) {
        props.setStatus(text);
        console.log("err:", text);
      }
    });
  return (
    <>
      <h5>Success</h5>
      <h5>Balance: {props.balance}</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          props.setBalance(data.balance);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      <h5>Email</h5>
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  );
}
