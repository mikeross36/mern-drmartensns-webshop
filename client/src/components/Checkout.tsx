type PropsType = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

export default function Checkout({ step1, step2, step3, step4 }: PropsType) {
  return (
    <main className="checkout__steps">
      <p className={step1 ? "active" : ""}>register</p>
      <p className={step2 ? "active" : ""}>shipping</p>
      <p className={step3 ? "active" : ""}>payment</p>
      <p className={step4 ? "active" : ""}>order</p>
    </main>
  );
}
