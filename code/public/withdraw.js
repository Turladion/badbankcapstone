function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const user = React.useContext(UserContext);
  return (
    <>
      {user.user === null ? (
        <Card bgcolor="success" header="Unauthorized" body={<h5>Login First!</h5>} />
      ) : (
        <Card
          bgcolor="success"
          header="Deposit"
          body={
            show ? (
              <WithdrawForm setShow={setShow} setStatus={setStatus} />
            ) : (
              <WithdrawMsg setShow={setShow} setStatus={setStatus} />
            )
          }
        />
      )}
    </>
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const user = React.useContext(UserContext);
  const email = user.user.email;
  const [amount, setAmount] = React.useState("");

  function handle() {
    fetch(`/account/update/${email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Deposit failed");
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
    </>
  );
}
