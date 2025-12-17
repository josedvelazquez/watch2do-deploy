import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Newsletter } from "@/components/ui/newsletter";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

import { supabase } from "@/lib/supabase";

interface Watch {
  id: number;
  name: string;
  price: number;
  image: string;
  category_name: string;
}

async function getFeaturedWatches() {
  const { data, error } = await supabase
    .from('watches')
    .select(`
      *,
      categories (
        name
      )
    `)
    .limit(4);

  if (error) {
    console.warn("Supabase query failed, using mock data:", error);
    return [
      { id: 1, name: "Chronos Silver", price: 1299, image: "/images/watch1.png", category_name: "Men" },
      { id: 2, name: "Midnight Leather", price: 899, image: "/images/watch2.png", category_name: "Men" },
      { id: 3, name: "Rose Elegance", price: 1499, image: "/images/watch3.png", category_name: "Women" },
      { id: 4, name: "Aviator Gold", price: 2100, image: "/images/hero.png", category_name: "Men" },
    ] as Watch[];
  }

  // Map the response to flatten category_name
  return data.map((watch: any) => ({
    ...watch,
    category_name: watch.categories?.name
  })) as Watch[];
}

export default async function Home() {
  const featuredWatches = await getFeaturedWatches();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.png"
              alt="Luxury Watch Hero"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <h1 className="text-[56px] leading-[64px] font-bold text-white font-serif">
              Hora de lujo <br /> en tu muñeca
            </h1>
            <p className="mb-8 text-[#9CA3AF] max-w-2xl text-[16px] leading-[24px] font-inter"> <br />
              Descubre nuestra colección curada de relojes de lujo, diseñados para la precisión y la distinción.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 border-b border-black/10 bg-black/50 backdrop-blur-md" asChild>
              <Link href="/catalog">Ver colección</Link>
            </Button>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-dark dark:text-white mb-2">Colección Destacada</h2>
                <p className="text-[#9CA3AF]">Relojes favoritos para el coleccionista.</p>
              </div>
              <Link href="/catalog" className="inline-flex items-center text-[#9CA3AF] dark:hover:text-primary hover:text-black mb-8 transition-colors">
                Ver Todo &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredWatches.map((watch) => (
                <Link key={watch.id} href={`/product/${watch.id}`} className="group h-full block">
                  <Card className="border-white/5 bg-white/5 overflow-hidden hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
                    <CardContent className="p-0 relative aspect-square">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col items-start p-6 flex-1 justify-between">
                      <div className="w-full">
                        <h3 className="text-lg font-semibold text-dark dark:text-white group-hover:text-primary dark:group-hover:text-primary/80 transition-colors mb-1">{watch.name}</h3>
                        <span className="text-primary font-bold block mb-4">${Number(watch.price).toLocaleString()}</span>
                      </div>
                      <div className="w-full flex justify-end space-y-4 pt-4 border-t dark:border-white/10 border-black/20">
                        <AddToCartButton productId={watch.id} iconOnly />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-24 bg-white/5 dark:bg-zinc-900/50 border-y dark:border-white/5 border-gray-300">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
                💎
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white">Materiales Premium</h3>
              <p className="text-[#9CA3AF]">Elaborado con cristal de zafiro, acero quirúrgico y cuero genuino.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white">Garantía de Vida</h3>
              <p className="text-[#9CA3AF]">Nos comprometemos con la calidad de nuestros relojes con una garantía completa.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
                🚚
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white">Envío Gratis</h3>
              <p className="text-[#9CA3AF]">Envío gratis en todos los pedidos.</p>
            </div>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
