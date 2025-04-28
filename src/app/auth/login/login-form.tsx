'use client'

import type React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle } from "lucide-react"
import { Button, Card, Input, Label } from '@/component'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password
      })

      if (result?.error) {
        setError(result.error)
      } else {
        console.log('RESULT', result)
        console.log('CALLBACK URL', callbackUrl)
        router.push(callbackUrl)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <Card.Header className='space-y-1'>
          <Card.Title className='text-center text-2xl font-bold'>Sign in to your account</Card.Title>
          <Card.Description className='text-center'>Enter your credentials to access your account</Card.Description>
        </Card.Header>
        <Card.Content>
          {error && (
            <span>{error}</span>
            // <Alert variant="destructive" className="mb-4">
            //   <AlertCircle className="h-4 w-4" />
            //   <AlertDescription>{error}</AlertDescription>
            // </Alert>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>username</Label>
              <Input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' required />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <a href='#' className='text-primary text-sm font-medium hover:underline'>
                  Forgot password?
                </a>
              </div>
              <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </form>
        </Card.Content>
        <Card.Footer>
          <Button className='w-full' onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}
