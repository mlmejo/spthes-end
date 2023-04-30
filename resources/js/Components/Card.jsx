export default function Card({ className, children }) {
  return (
    <div
      className={
        "bg-white p-4 shadow sm:rounded-lg sm:p-8 " + `${className ?? ""}`
      }
    >
      {children}
    </div>
  );
}
