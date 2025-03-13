
import Link from 'next/link'
//import { usePathname } from 'next/navigation'
import { requireAuth } from '@/lib/actions'
import Cart from './Cart'
async function Nav() {
  const pathname = ''
  const authenticated = await requireAuth()


  return (
    <nav className="bg-gray-800 mb-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link className={pathname == "/" ? "active rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"} href="/" aria-current="page">Meals</Link>
                <Link className={pathname == "/meals/add-meal" ? "active rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"} href="/meals/add-meal" aria-current="page">Add Meal</Link>
                <Link className={pathname == "/cart" ? "active rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"} href="/cart" aria-current="page">Cart </Link>
                {authenticated ?
                  <Link className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" href="/logout" aria-current="page">Logout</Link> :
                  <>
                    <Link className={pathname == "/login" ? "active rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"} href="/login" aria-current="page">Login</Link>
                    <Link className={pathname == "/signup" ? "active rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"} href="/signup" aria-current="page">Sign up</Link>

                  </>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Nav