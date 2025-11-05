export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </p>
      </div>
    </footer>
  )
}