"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const fullName = formData.get("name") as string
    const [firstname, ...lastnameArr] = fullName.split(" ")
    const lastname = lastnameArr.join(" ")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
        }),
      })

      const data = await response.json()

      if (data.error) {
        toast.error(data.message || "Erreur lors de la création du compte")
      } else {
        toast.success("Compte crée")
        router.push("/login")
      }
    } catch (error) {
      toast.error("Erreur lors de la création du compte")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Entrez vos informations pour créer votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nom complet</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="Prénom Nom" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@domaine.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Minimum 8 caractère.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmer le mot de passe
              </FieldLabel>
              <Input id="confirm-password" name="confirm-password" type="password" required />
            </Field>
            <Field>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Création..." : "Créer mon compte"}
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Déjà un compte ?{' '}
                <a href="/login" className="text-primary hover:underline">
                  Connectez-vous !
                </a>
              </p>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
