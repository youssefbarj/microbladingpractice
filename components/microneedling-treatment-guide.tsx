"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, ChevronLeft, ChevronRight, Clock, CheckCircle, Trophy, Star, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface TreatmentStep {
  id: number
  title: string
  duration: string
  image: string
  video?: string // Added optional video property
  description: string
  benefits: string[]
}

const treatmentSteps: TreatmentStep[] = [
  {
    id: 1,
    title: "Préparer le matériel et l'espace de travail",
    duration: "5 min",
    image: "/images/step-1.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/step%200-EUDsvPUOAsZdrbjmyf3xEK2qgl9SiT.mp4",
    description: "Stériliser tous les outils et surfaces, vérifier la checklist matériel complète",
    benefits: ["Sécurité maximale", "Stérilisation", "Organisation"],
  },
  {
    id: 2,
    title: "Désinfecter les mains",
    duration: "2 min",
    image: "/images/step-2.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/step%201%20%282%29-iQcf3vAA2ig7L7oOe9YKRaYaQ65EDP.mp4",
    description: "Lavage chirurgical obligatoire, séchage avec serviette stérile",
    benefits: ["Hygiène parfaite", "Prévention infections", "Protocole médical"],
  },
  {
    id: 3,
    title: "Préparation des cils",
    duration: "10 min",
    image: "/images/step-3.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre24-ezgif.com-crop-video-4yVtSF4r1cdT5b7ablxpJjhmc4bXtd.mp4",
    description: "Nettoyez délicatement la zone des cils avec un démaquillant spécialisé pour éliminer tout résidu de maquillage, huiles naturelles ou impuretés. Utilisez un coton-tige ou une lingette douce pour nettoyer chaque cil individuellement, en veillant à ce qu'ils soient parfaitement propres et dégraissés avant d'appliquer les produits de lash lifting.",
    benefits: ["Cils propres", "Préparation optimale", "Adhérence parfaite"],
  },
  {
    id: 4,
    title: "Application de l'adhésif cils",
    duration: "8 min",
    image: "/images/step-4.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre25-ezgif.com-crop-video-9Cb4eOhgaRBGF7p1zI7tdTPnG13Ww2.mp4",
    description: "Appliquez délicatement l'adhésif spécialisé pour lash lifting sur la paupière supérieure à l'aide d'un applicateur fin. Veillez à créer une ligne uniforme le long de la ligne des cils pour assurer une adhérence optimale. Laissez l'adhésif devenir légèrement collant avant de procéder à l'étape suivante.",
    benefits: ["Adhérence parfaite", "Positionnement précis", "Base solide pour le lifting"],
  },
  {
    id: 5,
    title: "Application d'adhésif sur le bouclier",
    duration: "3 min",
    image: "/images/step-5.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre27-ezgif.com-crop-video-2QPmjTfZ05emFT6G4ALzZiuMTfUbuM.mp4",
    description: "Appliquez délicatement l'adhésif spécialisé sur le bouclier en silicone à l'aide d'un applicateur fin. Veillez à répartir uniformément l'adhésif sur toute la surface du bouclier pour assurer une adhérence optimale. Cette étape est cruciale pour maintenir les cils en position pendant le processus de lifting.",
    benefits: ["Adhérence parfaite", "Positionnement optimal", "Base solide pour le lifting"],
  },
  {
    id: 6,
    title: "Positionnement du bouclier en silicone",
    duration: "2 min",
    image: "/images/step-6.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20sans%20titre%20%2817%29%20%28online-video-cutter.com%29%20%281%29%20%281%29-JvmBObVgrLjd7CpirGV63Z20QyrBpO.mp4",
    description: "Placez soigneusement le bouclier en silicone sur la paupière, au plus près de la racine des cils, en le fixant sur la ligne d'adhésif précédemment appliquée. Appuyez doucement avec vos doigts ou un outil pour le faire adhérer fermement. Un bon positionnement est la clé pour obtenir la courbure désirée.",
    benefits: ["Positionnement précis", "Courbure optimale", "Base solide pour le lifting"],
  },
  {
    id: 7,
    title: "Application d'adhésif sur le dessus du bouclier",
    duration: "1 min",
    image: "/images/step-7.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre19-ezgif.com-crop-video%20%281%29-O33amVNCF8lMc93bPWPncNXKBQMymR.mp4",
    description: "Appliquez une nouvelle couche d'adhésif sur la surface supérieure et incurvée du bouclier en silicone. C'est sur cette surface que les cils seront fixés. Assurez-vous que la couche est uniforme pour que chaque cil adhère correctement.",
    benefits: ["Adhérence optimale des cils", "Application uniforme", "Base parfaite pour le lifting"],
  },
  {
    id: 8,
    title: "Levage et fixation des cils",
    duration: "4 min",
    image: "/images/step-8.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre20-ezgif.com-crop-video-VuULhV4MX3U34TZEXxu9aF2qwTyJXf.mp4",
    description: "Utilisez un bâtonnet en bois ou un outil de lifting pour soulever les cils un par un depuis la racine et les presser contre le bouclier encollé. Séparez bien chaque cil pour qu'ils soient parallèles et bien répartis sur toute la surface du bouclier pour un résultat final net et sans paquets.",
    benefits: ["Séparation parfaite des cils", "Répartition uniforme", "Résultat sans paquets"],
  },
  {
    id: 9,
    title: "Application de la première lotion de lifting",
    duration: "12 min",
    image: "/images/step-9.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre21-ezgif.com-crop-video-k6uNi4ecTobRYntkaxT8Ne3h6kyv5x.mp4",
    description: "Appliquez la première lotion de lifting sur les cils pour commencer le processus de modification de leur structure. Recouvrez avec un film plastique et laissez poser selon le temps recommandé pour votre type de cils.",
    benefits: ["Décomposition des liaisons", "Préparation au moulage", "Flexibilité des cils"],
  },
  {
    id: 10,
    title: "Application de la lotion neutralisante",
    duration: "10 min",
    image: "/images/step-10.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre22-ezgif.com-crop-video-odIUQV487gQbQGlryj7z38lrlmjXsg.mp4",
    description: "Retirez le film plastique et nettoyez la première lotion. Appliquez la lotion fixatrice (neutralisante) sur les cils pour verrouiller leur nouvelle courbure. Recouvrez à nouveau de film et laissez poser 10 minutes.",
    benefits: ["Courbure verrouillée", "Effet longue durée", "Résultat optimal"],
  },
  {
    id: 11,
    title: "Nettoyage final des cils",
    duration: "3 min",
    image: "/images/step-11.png",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designsanstitre23-ezgif.com-crop-video-4EJZlx86JYvSQBBbwbiMRPwd9zWyHW.mp4",
    description: "Retirez tous les films plastiques et boucliers délicatement. Nettoyez soigneusement les cils avec des cotons et un nettoyant doux pour enlever tous les résidus de produit.",
    benefits: ["Nettoyage complet", "Élimination des résidus", "Finition parfaite"],
  },
  {
    id: 12,
    title: "Transition vers les sourcils",
    duration: "2 min",
    image: "/images/step-12.png",
    video: "/videos/step-12.mp4",
    description: "Pendant que les cils posent sous le film plastique, passons à la technique de rehaussement des sourcils. Préparez les outils spécialisés pour cette partie du traitement.",
    benefits: ["Optimisation du temps", "Efficacité du protocole", "Transition fluide"],
  },
  {
    id: 13,
    title: "Nettoyage et préparation des sourcils",
    duration: "5 min",
    image: "/images/step-13.png",
    video: "/videos/step-13.mp4",
    description: "Nettoyez délicatement la zone des sourcils avec un démaquillant doux. Brossez les poils dans le sens de la pousse pour bien les séparer et identifier leur direction naturelle.",
    benefits: ["Sourcils propres", "Poils bien séparés", "Préparation optimale"],
  },
  {
    id: 14,
    title: "Mapping et design des sourcils",
    duration: "8 min",
    image: "/images/step-14.png",
    video: "/videos/step-14.mp4",
    description: "Utilisez des outils de mesure pour définir la forme parfaite des sourcils selon la morphologie du visage. Marquez les points clés : début, arche et fin du sourcil.",
    benefits: ["Forme personnalisée", "Symétrie parfaite", "Résultat harmonieux"],
  },
  {
    id: 15,
    title: "Application de l'adhésif sourcils",
    duration: "4 min",
    image: "/images/step-15.png",
    video: "/videos/step-15.mp4",
    description: "Appliquez l'adhésif spécialisé sur la peau au-dessus des sourcils où sera placé le bouclier. Veillez à une application uniforme pour une adhérence optimale.",
    benefits: ["Adhérence parfaite", "Positionnement stable", "Base solide"],
  },
  {
    id: 16,
    title: "Positionnement du bouclier sourcils",
    duration: "3 min",
    image: "/images/step-16.png",
    video: "/videos/step-16.mp4",
    description: "Placez soigneusement le bouclier spécialisé pour sourcils selon le mapping établi. Assurez-vous qu'il épouse parfaitement la forme désirée du sourcil.",
    benefits: ["Positionnement précis", "Forme idéale", "Maintien optimal"],
  },
  {
    id: 17,
    title: "Fixation des poils sur le bouclier",
    duration: "6 min",
    image: "/images/step-17.png",
    video: "/videos/step-17.mp4",
    description: "Brossez les poils des sourcils vers le haut et fixez-les sur le bouclier avec l'adhésif. Veillez à ce que tous les poils soient bien séparés et parallèles.",
    benefits: ["Poils bien positionnés", "Séparation parfaite", "Direction uniforme"],
  },
  {
    id: 18,
    title: "Application de la première lotion sourcils",
    duration: "10 min",
    image: "/images/step-18.png",
    video: "/videos/step-18.mp4",
    description: "Appliquez la première lotion de lifting sur les poils des sourcils. Recouvrez avec un film et laissez poser selon le temps adapté à l'épaisseur des poils.",
    benefits: ["Restructuration des poils", "Préparation au moulage", "Flexibilité optimale"],
  },
  {
    id: 19,
    title: "Application de la lotion neutralisante sourcils",
    duration: "8 min",
    image: "/images/step-19.png",
    video: "/videos/step-19.mp4",
    description: "Nettoyez la première lotion et appliquez la lotion neutralisante sur les sourcils. Cette étape fixe la nouvelle direction des poils vers le haut.",
    benefits: ["Fixation de la forme", "Effet longue durée", "Direction maintenue"],
  },
  {
    id: 20,
    title: "Retrait des boucliers et nettoyage",
    duration: "4 min",
    image: "/images/step-20.png",
    video: "/videos/step-20.mp4",
    description: "Retirez délicatement tous les boucliers et films plastiques. Nettoyez soigneusement les sourcils pour éliminer tous les résidus de produit.",
    benefits: ["Nettoyage complet", "Révélation du résultat", "Élimination des résidus"],
  },
  {
    id: 21,
    title: "Application d'huile nourrissante",
    duration: "3 min",
    image: "/images/step-21.png",
    video: "/videos/step-21.mp4",
    description: "Appliquez une huile nourrissante spécialisée sur les cils et sourcils avec des brosses propres. Ce soin hydrate et apporte de la brillance naturelle.",
    benefits: ["Hydratation intense", "Brillance naturelle", "Protection des poils"],
  },
  {
    id: 22,
    title: "Brossage final et mise en forme",
    duration: "2 min",
    image: "/images/step-22.png",
    video: "/videos/step-22.mp4",
    description: "Brossez une dernière fois les cils et sourcils dans leur nouvelle direction pour un résultat parfaitement net et défini.",
    benefits: ["Finition parfaite", "Résultat impeccable", "Mise en forme finale"],
  },
  {
    id: 23,
    title: "Vérification et retouches",
    duration: "3 min",
    image: "/images/step-23.png",
    video: "/videos/step-23.mp4",
    description: "Examinez attentivement le résultat final. Effectuez les retouches nécessaires pour garantir une symétrie parfaite entre les deux yeux.",
    benefits: ["Contrôle qualité", "Symétrie parfaite", "Résultat optimal"],
  },
  {
    id: 24,
    title: "Conseils et recommandations post-traitement",
    duration: "5 min",
    image: "/images/step-24.png",
    video: "/videos/step-24.mp4",
    description: "Donnez au client toutes les instructions importantes pour les 24-48h suivant le traitement. Expliquez les soins à éviter et les bonnes pratiques à adopter.",
    benefits: ["Instructions claires", "Préservation du résultat", "Satisfaction client"],
  },
  {
    id: 25,
    title: "Vidéo complète du protocole",
    duration: "5 min",
    image: "/images/step-25.png",
    video: "https://player.vimeo.com/video/1115752305?h=bd7693bad4&badge=0&autopause=0&player_id=0&app_id=58479",
    description: "Regardez l'intégralité du protocole de Lash and Brow lift en une seule vidéo sans interruption pour réviser toutes les étapes.",
    benefits: ["Formation complète", "Apprentissage continu", "Référence professionnelle"],
  },
  {
    id: 26,
    title: "Présentation du résultat final",
    duration: "3 min",
    image: "/images/step-31.png",
    video: "/videos/step-26.mp4",
    description: "Présentez le résultat final au client en expliquant les bénéfices obtenus et les conseils d'entretien pour maintenir l'effet.",
    benefits: ["Résultat professionnel", "Effet longue durée", "Satisfaction client"],
  },
]

export default function MicroneedlingTreatmentGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentStep < treatmentSteps.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1)
              return 0
            } else {
              setIsPlaying(false)
              setShowCompletion(true)
              return 100
            }
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setProgress(0)
    setIsPlaying(false)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
    }
  }

  const handleNext = () => {
    if (currentStep < treatmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
    }
  }

  const currentStepData = treatmentSteps[currentStep]

  const CompletionAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-violet-100 rounded-2xl flex flex-col items-center justify-center z-10"
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 300 - 150,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <Sparkles className="text-violet-400 w-4 h-4" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative">
          <Trophy className="w-20 h-20 text-violet-500" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Star className="w-8 h-8 text-violet-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-saeada text-blue-900 mb-3">Félicitations !</h2>
        <p className="text-lg md:text-xl font-quicksand text-blue-800 mb-2">
          Protocole Lash Lifting terminé avec succès
        </p>
        <p className="text-base font-quicksand text-blue-700 mb-4">Toutes les étapes ont été complétées</p>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mx-4">
          <p className="text-sm font-quicksand text-gray-600 mb-1">Protocole réalisé avec</p>
          <h3 className="text-xl font-bold font-saeada text-brand-gradient">Guide Professionnel Lash Lifting</h3>
          <p className="text-xs font-quicksand text-gray-500 mt-1">Méthode certifiée • Résultats garantis</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-2 md:gap-3 mt-6 flex-wrap justify-center"
      >
        <div className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          26/26 Étapes
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          85 Minutes
        </div>
        <div className="bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Certifié
        </div>
        <div className="bg-pink-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Professionnel
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8"
      >
        <Button
          onClick={handleReset}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold rounded-full"
        >
          Recommencer
        </Button>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
      <AnimatePresence>
        {showFullScreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="absolute top-4 left-4 z-10">
              <Button
                onClick={() => setShowFullScreenVideo(false)}
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs md:text-sm font-bold"
              >
                <ChevronLeft size={20} />
                Retour au guide
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-6xl">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://player.vimeo.com/video/1115956913?badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="microblading_tutorial_for_beginners___e-lumy_digital_beauty_academy (1080p)"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                Protocole Complet de Lash Lifting
              </h1>
              <div className="flex flex-wrap gap-2 text-sm font-quicksand text-gray-600">
                <span>Technique professionnelle</span>
                <span className="hidden sm:inline">•</span>
                <span>26 étapes essentielles</span>
                <span className="hidden sm:inline">•</span>
                <span>Cils recourbés naturellement</span>
                <span className="hidden sm:inline">•</span>
                <span>Effet longue durée</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                {currentStep + 1}/{treatmentSteps.length}
              </span>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base font-semibold font-quicksand text-gray-700">85min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 p-2 md:p-4">
          {currentStep === 11 ? ( // Updated condition to check for step 12 (index 11)
            <div className="md:col-span-9">
              <motion.div
                key={`transition-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg text-center min-h-[400px] flex flex-col justify-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold font-saeada text-gray-800 mb-6">
                  Transition vers les sourcils
                </h2>
                <p className="text-lg md:text-xl font-quicksand text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Pendant que les cils posent sous le film plastique, passons à la technique de rehaussement des
                  sourcils.
                </p>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="md:col-span-4 hidden md:flex flex-col justify-center">
                <motion.div
                  key={`title-${currentStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl p-4 md:p-6 shadow-lg mb-4 md:mb-0"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-40 h-40 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl overflow-hidden shadow-md">
                      {currentStepData.image && (
                        <Image
                          src={currentStepData.image || "/placeholder.svg"}
                          alt={`${currentStepData.title} illustration`}
                          width={160}
                          height={160}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold font-saeada text-gray-800 mb-2 md:mb-3 text-center md:text-left">
                    {currentStepData.title}
                  </h2>
                  <div className="flex justify-center md:justify-start mb-3">
                    <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-brand-gradient text-white rounded-full text-sm md:text-base font-bold font-quicksand">
                      {currentStepData.duration}
                    </span>
                  </div>
                  <p className="text-sm md:text-base font-quicksand text-gray-600 leading-relaxed text-center md:text-left">
                    {currentStepData.description}
                  </p>
                </motion.div>
              </div>

              <div className="md:col-span-5 order-first md:order-none">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStepData.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-64 sm:h-80 md:h-[28rem] bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl overflow-hidden shadow-lg"
                    >
                      {currentStepData.video ? (
                        <video
                          key={currentStepData.video}
                          className="w-full h-full object-contain"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={currentStepData.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : currentStepData.image ? (
                        <Image
                          src={currentStepData.image || "/placeholder.svg"}
                          alt={currentStepData.title}
                          fill
                          style={{ objectFit: "contain" }}
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span>Vidéo non disponible</span>
                        </div>
                      )}

                      {isPlaying && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none rounded-3xl"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(0, 4, 53, 0.5)",
                              "0 0 0 8px rgba(0, 4, 53, 0.2)",
                              "0 0 0 0 rgba(0, 4, 53, 0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence>{showCompletion && <CompletionAnimation />}</AnimatePresence>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="md:hidden bg-white mx-2 mb-2 rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="text-center mb-3">
              <h2 className="text-xl font-bold font-saeada text-gray-800 mb-2">{currentStepData.title}</h2>
              {currentStep !== 11 && (
                <span className="inline-block px-4 py-2 bg-brand-gradient text-white rounded-full text-sm font-bold font-quicksand">
                  {currentStepData.duration}
                </span>
              )}
            </div>

          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-3 md:p-4 border-t border-gray-100">
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-3 md:mb-4">
            <motion.div
              className="h-2 md:h-3 rounded-full bg-brand-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + progress / 100) / treatmentSteps.length) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-center gap-3 md:gap-4 mb-3 md:mb-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              size="default"
              className="px-4 py-2 md:px-6 md:py-3 bg-brand-gradient text-white border-0 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 font-quicksand text-sm md:text-base transition-all duration-200"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentStep === treatmentSteps.length - 1}
              variant="outline"
              size="default"
              className="px-4 py-2 md:px-6 md:py-3 bg-brand-gradient text-white border-0 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 font-quicksand text-sm md:text-base transition-all duration-200"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              size="default"
              className="px-4 py-2 md:px-6 md:py-3 bg-brand-gradient text-white border-0 hover:shadow-lg font-quicksand text-sm md:text-base transition-all duration-200"
            >
              <RotateCcw size={20} className="md:w-6 md:h-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
            {treatmentSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 flex items-center justify-center text-sm md:text-lg font-bold font-quicksand ${
                  index === currentStep
                    ? "bg-brand-gradient text-white shadow-xl scale-110"
                    : index < currentStep || showCompletion
                      ? "bg-green-400 text-white shadow-lg"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                whileHover={{ scale: index === currentStep ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{index + 1}</span>

                {index === currentStep && progress > 0 && !showCompletion && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-white rounded-b-full z-10"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                )}

                {(index < currentStep || showCompletion) && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-green-400 rounded-full p-1 z-20 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle size={8} className="md:w-2.5 md:h-2.5 text-white" />
                  </motion.div>
                )}

                {index === currentStep && !showCompletion && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-white rounded-full p-1 z-20 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-gradient rounded-full animate-pulse" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
