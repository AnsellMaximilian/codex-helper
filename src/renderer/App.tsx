export default function App() {
  return (
    <div className="">
      <h1 className="text-xl font-bold">Welcome</h1>
      <button
        className="bg-red-600 text-white"
        onClick={async () => {
          const res = await api.files.pickFolder();
          console.log(res);
        }}
      >
        Choose Project Folder
      </button>
    </div>
  );
}
