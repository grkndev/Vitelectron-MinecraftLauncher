import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ExternalLink } from "lucide-react"

import CarouselAuto from "../CarouselAuto"


export default function Announcements() {
    
    return (
        <div className=" animate-in slide-in-from-top-4 fade-in duration-500 ease-out w-full flex flex-row justify-center items-center gap-4 h-full">
            <Card className="w-full max-w-sm h-full bg-transparent backdrop-blur-xl-optimized">
                <CardHeader className="items-center flex justify-center">
                    <CardTitle>
                        <Badge className="text-sm bg-green-700 text-white font-medium">Yeni Ürünler</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 h-full">
                    <p>Yeni kozmetiklerimizi denedin mi?</p>

                    <div>
                        <div className="sketchfab-embed-wrapper"> 
                            <iframe 
                                title="Baby Moth - Minecraft Creature" 
                                frameBorder="0" 
                                allowFullScreen={false} 
                                allow="autoplay; xr-spatial-tracking" 
                                
                                src="https://sketchfab.com/models/2479e6dc5013498dbe9bc0df481ead15/embed?autostart=1&transparent=1&ui_theme=dark"
                            /> 
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium">Mağazaya git
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </CardFooter>
            </Card>

            <CarouselAuto />



        </div>
    )
}