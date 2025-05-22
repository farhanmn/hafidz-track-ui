export default function RegisterPage() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-center text-green-700 dark:text-green-300 mb-6">
        Daftar Hafidz-Track
      </h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nama Lengkap</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
        >
          Daftar
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Sudah punya akun? <a href="/" className="text-green-600 dark:text-green-400 hover:underline">Login</a>
      </p>
    </div>
  );
}