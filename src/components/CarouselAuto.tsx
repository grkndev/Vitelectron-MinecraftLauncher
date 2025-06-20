"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink } from "lucide-react"
import { type CarouselApi } from "@/components/ui/carousel"
export default function CarouselAuto() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const [api, setApi] = React.useState<CarouselApi>()
    const [currentSlide, setCurrent] = React.useState(0)
    const [slides, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

       
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())

        })
    }, [api])

    return (
        <div className="relative max-w-sm ">
            <Carousel
                setApi={setApi}
                // opts={{
                //     align: "start",
                //     loop: true,
                // }}
                className="w-full"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-full ">

                    <CarouselItem key={1} className="w-full ">
                        <Card className=" max-w-sm bg-transparent backdrop-blur-xl-optimized">
                            <CardHeader className="items-center flex justify-center">
                                <CardTitle>
                                    <Badge className="text-sm bg-green-700 text-white font-medium">Yeni Ürünler</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <p>Yeni kozmetiklerimizi denedin mi?</p>

                                <div className="rounded-lg overflow-hidden">
                                    <img src="https://placehold.co/600x300" alt="" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium">Mağazaya git
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </CarouselItem>

                    <CarouselItem key={2} className="w-full ">
                        <Card className=" max-w-sm bg-transparent backdrop-blur-xl-optimized">
                            <CardHeader className="items-center flex justify-center">
                                <CardTitle>
                                    <Badge className="text-sm bg-green-700 text-white font-medium">Yeni Ürünler</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <p>Yeni kozmetiklerimizi denedin mi?</p>

                                <div className="rounded-lg overflow-hidden">
                                    <img src="https://placehold.co/600x300" alt="" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium">Mağazaya git
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </CarouselItem>

                    <CarouselItem key={3} className="w-full ">
                        <Card className=" max-w-sm bg-transparent backdrop-blur-xl-optimized">
                            <CardHeader className="items-center flex justify-center">
                                <CardTitle>
                                    <Badge className="text-sm bg-green-700 text-white font-medium">Yeni Ürünler</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <p>Yeni kozmetiklerimizi denedin mi?</p>

                                <div className="rounded-lg overflow-hidden">
                                    <img src="https://placehold.co/600x300" alt="" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium">Mağazaya git
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="flex flex-row justify-center items-center gap-4 absolute -bottom-4 left-0 right-0">
                {
                    Array.from({ length: slides }).map((_, index) => (
                        <div key={index} className={`w-2 h-2  rounded-full ${currentSlide === index ? "bg-green-700" : "bg-white"}`} />
                    ))
                }
            </div>
        </div>
    )
}