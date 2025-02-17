import { useForm } from 'react-hook-form'
import { providers, signIn, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const loginUser = async (data) => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })
      router.push('/home')
    } catch (error) {
      alert(error)
    }
  }
  return (
      // <!-- Login goes here -->
      <>
        <form className="mt-8" onSubmit={handleSubmit(loginUser)}>
          <div className="sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="col-span-3 sm:col-span-2">
                <div className="mt-1 flex rounded-full border text-teal ml-2">
                  <input
                    {...register('email', { required: true })}
                    type="text"
                    name="email"
                    id="email"
                    className="p-3 pl-6 rounded rounded-full sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-light focus:border-transparent"
                    placeholder="Enter your email" />
                </div>
                {errors.email && <span className="ml-2">This field is required</span>}
              </div>

              <div className="col-span-3 sm:col-span-2">
                <div className="mt-1 flex rounded-full border text-teal ml-2">
                  <input
                  {...register('password', { required: true })}
                    type="password"
                    name="password"
                    id="password"
                    className="p-3 pl-6 rounded-full sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-light focus:border-transparent"
                    placeholder="Enter password" />
                </div>
                {errors.password && <span className="ml-2">This field is required</span>}
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <div className="flex text-teal ml-2 mt-16">
                  <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium  bg-teal-light hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="text-white  text-lg">Submit</span>
                  </button>
                </div>
              </div>
              <div className="text-center mt-2">
                  Don’t have an account? <a href="register" className="text-teal-light"> Sign Up</a>
              </div>
          </div>
        </div>
      </form>
    </>
  )
}

signIn.getInitialProps = async (context) => {
  const { request, response } = context
  const session = await (getSession({ request }))

  if (session && response && session.accessToken) {
    response.writeHead(302, {
      Location: '/dashboard'
    })
    response.end()
    return
  }
  return {
    session: undefined,
    providers: await providers(context)
  }
}
