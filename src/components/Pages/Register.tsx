import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  })
  const [error, setError] = useState("")
  
  const { register, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!formData.username || !formData.email || !formData.password) {
      setError("Tüm alanlar zorunludur")
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor!")
      return
    }
    
    if (!formData.agreeTerms) {
      setError("Kullanım şartlarını kabul etmelisiniz")
      return
    }

    try {
      const success = await register(formData.username, formData.email, formData.password)
      if (success) {
        navigate("/", { replace: true })
      } else {
        setError("Kayıt başarısız. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Don't render anything if user is authenticated (prevents flash)
  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-xl">Yönlendiriliyor...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-950 rounded-xl shadow-lg border border-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-100">
            Kayıt Ol
          </h1>
          <p className="text-slate-400 mt-2">
            Minecraft Launcher hesabı oluşturun
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-200">Kullanıcı Adı</Label>
            <Input
              id="username"
              type="text"
              placeholder="Kullanıcı adınızı girin"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-posta adresinizi girin"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="Şifrenizi girin"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-200">Şifre Tekrarı</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Şifrenizi tekrar girin"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleChange("agreeTerms", checked as boolean)}
              className="border-slate-600 data-[state=checked]:bg-slate-700"
              disabled={isLoading}
            />
            <Label 
              htmlFor="terms" 
              className="text-sm font-normal cursor-pointer text-slate-300"
            >
              Kullanım şartlarını kabul ediyorum
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100"
            size="lg"
            disabled={!formData.agreeTerms || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kayıt oluşturuluyor...
              </>
            ) : (
              "Kayıt Ol"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            Zaten hesabınız var mı?{" "}
            <Link 
              to="/login"
              className="text-slate-300 hover:text-slate-100 underline"
            >
              Giriş Yapın
            </Link>
          </p>
        </div>

        <div className="text-center pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            © 2024 Minecraft Launcher. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  )
} 