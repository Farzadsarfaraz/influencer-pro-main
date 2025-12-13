import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Heart, 
  Users, 
  BarChart3, 
  Shield, 
  Star, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function LandingPage() {
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
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team-Kollaboration",
      description: "Arbeite mit deinem Team zusammen an Influencer-Kampagnen"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "ROI-Tracking",
      description: "Verfolge den Erfolg deiner Influencer-Partnerschaften"
    }
  ];

  const stats = [
    { number: "10K+", label: "Aktive Influencer" },
    { number: "500+", label: "Zufriedene Marken" },
    { number: "95%", label: "Zufriedenheitsrate" },
    { number: "24/7", label: "Support verfügbar" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">InfluencerHub</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/auth/login" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
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
        </div>
      </nav>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Die professionelle Influencer-Management Plattform
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Finde, manage und tracke 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Influencer-Kampagnen
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
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
              className="border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Alles, was du für erfolgreiches 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Influencer-Marketing
            </span>{" "}
            brauchst
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Eine umfassende Plattform, die jeden Schritt deiner Influencer-Kampagne unterstützt
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            So einfach funktioniert es
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
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
                <div key={index} className="flex-1">
                  <div className="text-6xl font-bold text-blue-200 dark:text-blue-900/50 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Starte noch heute mit InfluencerHub
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Verbessere dein Influencer-Marketing mit unserer professionellen Plattform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/login" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Kostenlose Demo anfordern
              </Link>
              <Link 
                href="/auth/login" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Mit Team anmelden
              </Link>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Keine Kreditkarte erforderlich</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>14 Tage kostenlos testen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Jederzeit kündbar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">InfluencerHub</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Datenschutz
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Nutzungsbedingungen
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Kontakt
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} InfluencerFrame. Alle Rechte vorbehalten.</p>
            <p className="mt-2">Die professionelle Plattform für Influencer-Marketing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}