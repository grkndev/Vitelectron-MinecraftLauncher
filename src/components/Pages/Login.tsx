import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    
    const { login, isLoading, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // Redirect to home if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        
        if (!username || !password) {
            setError("Kullanıcı adı ve şifre zorunludur")
            return
        }

        try {
            const success = await login(username, password)
            if (success) {
                navigate("/", { replace: true })
            } else {
                setError("Giriş başarısız. Kullanıcı adı veya şifre hatalı.")
            }
        } catch (error) {
            setError("Bir hata oluştu. Lütfen tekrar deneyin.")
        }
    }

    // Don't render anything if user is authenticated (prevents flash)
    if (isAuthenticated) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-tl from-slate-950 to-black">
                <div className="text-white text-xl">Yönlendiriliyor...</div>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gradient-to-tl from-slate-950 to-slate-800">
                <div className="w-full max-w-md p-8 space-y-6 bg-slate-950 rounded-xl shadow-lg border border-slate-800">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-slate-100">
                            Minecraft Launcher
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Hesabınıza giriş yapın
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                required
                                maxLength={50}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-200">Şifre</Label>
                            <div className="flex flex-row gap-2 relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Şifrenizi girin"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                    maxLength={50}
                                    required
                                    disabled={isLoading}
                                />
                                <Button 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setShowPassword(!showPassword)
                                    }} 
                                    variant={"ghost"} 
                                    className="right-0 absolute hover:bg-transparent hover:text-slate-500"
                                    disabled={isLoading}
                                    type="button"
                                >
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </Button>
                            </div>
                            <Button 
                                onClick={(e) => {
                                    e.preventDefault()
                                    console.log("Şifremi unuttum")
                                }} 
                                variant={"link"} 
                                className="text-slate-300 text-xs p-0"
                                disabled={isLoading}
                                type="button"
                            >
                                Şifremi unuttum
                            </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                disabled={isLoading}
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal cursor-pointer text-slate-300"
                            >
                                Beni hatırla
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                "Giriş Yap"
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-slate-400">
                            Hesabınız yok mu?{" "}
                            <Link
                                to="/register"
                                className="text-slate-300 hover:text-slate-100 underline"
                            >
                                Kayıt Ol
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
        </>
    )
}

export default Login
