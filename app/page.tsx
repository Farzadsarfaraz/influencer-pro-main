import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { 
  Search, 
  Heart, 
  Users, 
  BarChart3, 
  Shield, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect('/influencers');
  }

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Intelligente Suche",
      description: "Finde Influencer basierend auf Nische, Engagement-Rate und Zielgruppe"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Favoriten-Management",
      description: "Speichere interessante Profile und organisiere sie in Listen"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detaillierte Analytics",
      description: "Umfassende Performance-Daten und Engagement-Statistiken"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Sichere Plattform",
      description: "Verschlüsselte Daten und geschützte Unternehmensinformationen"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">InfluencerFrame</span>
        </div>
        
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">
            Login
          </Link>
          <Link 
            href="/auth/login" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Die professionelle Influencer-Management Plattform
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Finde, manage und tracke{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Influencer-Kampagnen
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Die All-in-One Lösung für Marken und Agenturen, um erfolgreiche Influencer-Marketing-Kampagnen zu planen, durchzuführen und zu analysieren.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/login" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-3"
            >
              <span>Kostenlos starten</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="#features" 
              className="border-2 border-gray-300 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors text-center"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Alles, was du für erfolgreiches{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Influencer-Marketing
            </span>{" "}
            brauchst
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Eine umfassende Plattform, die jeden Schritt deiner Influencer-Kampagne unterstützt
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            So einfach funktioniert es
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              {[
                {
                  step: "01",
                  title: "Influencer entdecken",
                  description: "Durchsuche unsere umfangreiche Datenbank nach passenden Influencern"
                },
                {
                  step: "02",
                  title: "Favoriten verwalten",
                  description: "Speichere interessante Profile und organisiere sie in Listen"
                },
                {
                  step: "03",
                  title: "Kampagnen starten",
                  description: "Plane und verfolge deine Influencer-Marketing-Kampagnen"
                }
              ].map((item, index) => (
                <div key={index} className="flex-1 text-center md:text-left">
                  <div className="text-5xl sm:text-6xl font-bold text-blue-200 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InfluencerFrame</span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8">
            <Link href="#" className="text-gray-600 hover:text-blue-600">Datenschutz</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Nutzungsbedingungen</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Kontakt</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} InfluencerFrame. Alle Rechte vorbehalten.</p>
          <p className="mt-2">Die professionelle Plattform für Influencer-Marketing</p>
        </div>
      </footer>
    </div>
  );
}