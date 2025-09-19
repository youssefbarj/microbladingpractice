"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, ChevronLeft, ChevronRight, Clock, CheckCircle, Trophy, Star, Sparkles, Play, X } from "lucide-react"
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
    title: "Détermination des points de départ des sourcils",
    duration: "1min 10s",
    image: "/images/step 1.png",
    video: "/videos/step 1.mov",
    description: "À l'aide d'un crayon et d'une règle chirurgicale, la première étape consiste à localiser le centre exact du visage, entre les deux yeux. Une ligne verticale est tracée pour marquer ce centre. Ensuite, en utilisant la règle verticalement, des lignes parallèles sont tracées pour marquer le point de départ de chaque sourcil, généralement alignées avec l'arête du nez.",
    benefits: ["Localisation précise", "Symétrie parfaite", "Base solide"],
  },
  {
    id: 2,
    title: "Marquage du point de fin des sourcils",
    duration: "25s",
    image: "/images/step 2.png",
    video: "/videos/step 2.mov",
    description: "En utilisant la règle comme guide, une ligne diagonale est tracée à partir de la base (simulée) de la narine, en passant par le coin externe de l'œil. Le point où cette ligne croise l'arcade sourcilière détermine le point final idéal de la queue du sourcil. Cette étape est répétée de manière symétrique pour l'autre sourcil.",
    benefits: ["Point final précis", "Longueur optimale", "Symétrie assurée"],
  },
  {
    id: 3,
    title: "Création de la ligne de base et identification des points clés",
    duration: "1min 40s",
    image: "/images/step 3.png",
    video: "/videos/step 3.mov",
    description: "Une ligne de base horizontale est tracée pour connecter les points de départ et de fin du sourcil, définissant ainsi la limite inférieure. Ensuite, des points de repère sont marqués le long de cette ligne et au-dessus de l'œil pour identifier les zones clés, notamment le début du corps du sourcil, le point le plus haut de l'arche, et la fin de la queue.",
    benefits: ["Ligne de base définie", "Points de repère précis", "Structure claire"],
  },
  {
    id: 4,
    title: "Définition de l'épaisseur du sourcil",
    duration: "10s",
    image: "/images/step 4.png",
    video: "/videos/step 4.mov",
    description: "Des points sont marqués verticalement au-dessus des points de départ et du corps du sourcil pour établir l'épaisseur souhaitée. Cette mesure est cruciale pour s'assurer que les deux sourcils auront une épaisseur uniforme et symétrique.",
    benefits: ["Épaisseur uniforme", "Symétrie garantie", "Proportion parfaite"],
  },
  {
    id: 5,
    title: "Tracé de la ligne inférieure du sourcil",
    duration: "40s",
    image: "/images/step 5.png",
    video: "/videos/step 5.mov",
    description: "Les points de repère inférieurs, marqués lors des étapes précédentes, sont soigneusement connectés à l'aide de la règle. Cette action crée une ligne inférieure nette et définie, formant la base de la forme finale du sourcil, de la tête à la queue.",
    benefits: ["Ligne inférieure nette", "Base définie", "Forme structurée"],
  },
  {
    id: 6,
    title: "Tracé de la ligne supérieure du corps du sourcil",
    duration: "1min",
    image: "/images/step 6.png",
    video: "/videos/step 6.mov",
    description: "En utilisant la règle, les points supérieurs de la tête du sourcil sont connectés au point le plus haut de l'arche. Cette ligne définit le bord supérieur du corps du sourcil et établit l'angle de l'arche, un élément clé pour l'expression du visage.",
    benefits: ["Bord supérieur défini", "Angle d'arche optimal", "Expression du visage"],
  },
  {
    id: 7,
    title: "Dessin de la queue du sourcil (ligne supérieure)",
    duration: "35s",
    image: "/images/step 7.png",
    video: "/videos/step 7.mov",
    description: "Le point le plus haut de l'arche est connecté au point de fin du sourcil qui a été marqué à l'étape 2. Cette ligne descendante complète le contour supérieur du sourcil et crée une queue effilée et élégante.",
    benefits: ["Queue effilée", "Contour supérieur défini", "Élégance assurée"],
  },
  {
    id: 8,
    title: "Finalisation du contour complet du sourcil",
    duration: "1min 5s",
    image: "/images/step 8.png",
    video: "/videos/step 8.mov",
    description: "Toutes les lignes de guidage sont maintenant connectées pour former un contour complet et fermé pour chaque sourcil. Cette étape permet de visualiser la forme finale et de vérifier la symétrie globale avant de procéder au remplissage. Le crayon est utilisé pour renforcer et clarifier l'ensemble du contour.",
    benefits: ["Contour complet", "Symétrie vérifiée", "Forme finale visualisée"],
  },
  {
    id: 9,
    title: "Raffinement des lignes et des angles",
    duration: "45s",
    image: "/images/step 9.png",
    video: "/videos/step 9.mov",
    description: "Cette étape consiste à revoir et à perfectionner la forme tracée. La règle est utilisée pour vérifier les angles et la rectitude des lignes, en particulier celles de la queue et de la base du sourcil. De petits ajustements sont faits pour garantir une forme impeccable et précise.",
    benefits: ["Lignes parfaites", "Angles précis", "Forme impeccable"],
  },
  {
    id: 10,
    title: "Remplissage de la forme pour visualisation",
    duration: "1min 5s",
    image: "/images/step 10.png",
    video: "/videos/step 10.mov",
    description: "Le contour du sourcil est entièrement rempli avec le crayon. Cette technique permet de simuler l'apparence du sourcil une fois le microblading terminé. Cela offre une visualisation claire de la forme, du poids et de l'équilibre du sourcil par rapport à l'œil et aux autres traits du visage.",
    benefits: ["Visualisation claire", "Simulation réaliste", "Équilibre évalué"],
  },
  {
    id: 11,
    title: "Remplissage du second sourcil pour la symétrie",
    duration: "45s",
    image: "/images/step 11.png",
    video: "/videos/step 11.mov",
    description: "En utilisant le même crayon, le contour du deuxième sourcil est entièrement rempli. Cette étape est essentielle pour la vérification visuelle. Avoir les deux sourcils entièrement ombrés permet à l'artiste de comparer leur forme, leur taille et leur équilibre global, et d'apporter les corrections finales avant de passer à l'étape de pigmentation.",
    benefits: ["Symétrie vérifiée", "Comparaison visuelle", "Corrections possibles"],
  },
  {
    id: 12,
    title: "Nettoyage des contours pour une définition nette",
    duration: "1min 20s",
    image: "/images/step 12.png",
    video: "/videos/step 12.mov",
    description: "Avec une lingette propre et des cotons-tiges, l'excès de crayon et les lignes de guidage autour des sourcils dessinés sont soigneusement effacés. Cette étape de nettoyage est cruciale car elle révèle la forme finale et précise des sourcils. Cela permet une dernière évaluation de la symétrie sans aucune distraction visuelle.",
    benefits: ["Forme finale révélée", "Nettoyage précis", "Évaluation claire"],
  },
  {
    id: 13,
    title: "Vérification de la forme tracée",
    duration: "10s",
    image: "/images/step 13.png",
    video: "/videos/step 13.mov",
    description: "Un bâtonnet en bois est utilisé pour gratter doucement le crayon à l'intérieur de la forme. Cette technique permet de vérifier la netteté des lignes de contour directement sur la peau en silicone et de s'assurer que la forme est bien définie avant le nettoyage final.",
    benefits: ["Netteté vérifiée", "Forme définie", "Contour précis"],
  },
  {
    id: 14,
    title: "Nettoyage de la zone de travail interne",
    duration: "55s",
    image: "/images/step 14.png",
    video: "/videos/step 14.mov",
    description: "À l'aide d'un coton-tige, le remplissage au crayon à l'intérieur du contour du sourcil est délicatement retiré. L'objectif est de ne laisser que le contour extérieur. Ce contour servira de guide précis pour le placement des traits de microblading, assurant que chaque trait reste dans les limites de la forme convenue.",
    benefits: ["Contour net", "Guide précis", "Placement optimal"],
  },
  {
    id: 15,
    title: "Préparation du pigment",
    duration: "15s",
    image: "/images/step 15.png",
    video: "/videos/step 15.mov",
    description: "L'artiste utilise un outil pour prélever une petite quantité de pigment de microblading et la déposer dans une bague à pigment stérile. Le port de la bague à pigment au doigt permet un accès rapide et efficace au pigment pendant la procédure, optimisant ainsi le flux de travail.",
    benefits: ["Accès rapide", "Flux optimisé", "Stérilité assurée"],
  },
  {
    id: 16,
    title: "Assemblage de l'outil de microblading",
    duration: "30s",
    image: "/images/step 16.png",
    video: "/videos/step 16.mov",
    description: "Une lame de microblading stérile et à usage unique est retirée de son emballage protecteur. Elle est ensuite insérée avec précaution dans le porte-lame du stylet manuel. Le respect des normes d'hygiène lors de cette étape est fondamental pour garantir la sécurité.",
    benefits: ["Hygiène respectée", "Sécurité garantie", "Outil prêt"],
  },
  {
    id: 17,
    title: "Sécurisation de la lame dans le stylet",
    duration: "15s",
    image: "/images/step 17.png",
    video: "/videos/step 17.mov",
    description: "Le mécanisme de serrage du stylet de microblading est fermement vissé pour fixer la lame en place. Il est impératif de s'assurer que la lame est stable et ne bouge pas. Une lame bien fixée est essentielle pour garantir la sécurité, le contrôle et la précision des traits.",
    benefits: ["Lame stable", "Contrôle optimal", "Précision assurée"],
  },
  {
    id: 18,
    title: "Création des premiers poils à la tête du sourcil",
    duration: "1min 45s",
    image: "/images/step 18.png",
    video: "/videos/step 18.mov",
    description: "Après avoir trempé la lame dans le pigment, l'artiste commence le travail pratique en effectuant les premiers traits de poil à la tête du sourcil. Les incisions sont réalisées avec soin à l'intérieur du contour, en suivant un schéma qui imite la direction naturelle de la pousse des poils dans cette zone.",
    benefits: ["Premières incisions", "Direction naturelle", "Technique précise"],
  },
  {
    id: 19,
    title: "Création des poils du corps et de la ligne de transition (Spine)",
    duration: "1min 40s",
    image: "/images/step 19.png",
    video: "/videos/step 19.mov",
    description: "L'artiste continue à implanter des traits de poil en progressant le long du corps du sourcil vers l'arche. La technique se concentre sur la création de la 'spine', la zone où les traits supérieurs et inférieurs se rejoignent. Les traits sont dessinés avec une légère courbure pour un rendu hyperréaliste.",
    benefits: ["Spine créée", "Rendu hyperréaliste", "Courbure naturelle"],
  },
  {
    id: 20,
    title: "Finalisation des traits et transition vers le second sourcil",
    duration: "20s",
    image: "/images/step 20.png",
    video: "/videos/step 20.mov",
    description: "Les derniers traits sont ajoutés pour compléter le motif sur le premier sourcil. L'artiste enchaîne ensuite en commençant les premiers traits sur le second sourcil. Cette transition rapide aide à maintenir la cohérence du geste et de la pression, favorisant ainsi un résultat final symétrique.",
    benefits: ["Motif complet", "Transition fluide", "Symétrie maintenue"],
  },
  {
    id: 21,
    title: "Révélation des traits du second sourcil",
    duration: "20s",
    image: "/images/step 21.png",
    video: "/videos/step 21.mov",
    description: "Après la première passe de traits et l'application du pigment, l'excédent est nettoyé du second sourcil (celui du bas sur le mannequin). Cette action révèle les traits fondamentaux, permettant une comparaison directe de la symétrie, de la profondeur et du motif avec le premier sourcil déjà nettoyé.",
    benefits: ["Traits révélés", "Comparaison directe", "Symétrie évaluée"],
  },
  {
    id: 22,
    title: "Nettoyage final de la première passe",
    duration: "15s",
    image: "/images/step 22.png",
    video: "/videos/step 22.mov",
    description: "L'artiste procède à un nettoyage final et approfondi des deux sourcils et de la zone environnante. Le but est d'éliminer tout résidu de pigment de la surface, garantissant que les traits sont nets et parfaitement visibles pour l'évaluation avant d'entamer la deuxième passe.",
    benefits: ["Nettoyage approfondi", "Traits nets", "Évaluation claire"],
  },
  {
    id: 23,
    title: "Ajout de densité sur le second sourcil (Deuxième Passe)",
    duration: "1min 20s",
    image: "/images/step 23.png",
    video: "/videos/step 23.mov",
    description: "La deuxième passe commence, en se concentrant sur le sourcil du bas. L'artiste ajoute des traits plus fins et supplémentaires entre les traits initiaux. Cette étape est essentielle pour construire la densité, créer un effet de volume et de dimension, et perfectionner la plénitude générale de la forme du sourcil.",
    benefits: ["Densité augmentée", "Volume créé", "Plénitude parfaite"],
  },
  {
    id: 24,
    title: "Ajout de densité sur le premier sourcil (Deuxième Passe)",
    duration: "15s",
    image: "/images/step 24.png",
    video: "/videos/step 24.mov",
    description: "Pour garantir une symétrie parfaite, l'artiste effectue maintenant la deuxième passe sur le sourcil du haut. L'objectif est de reproduire la même densité et le même motif de traits que sur le sourcil du bas, assurant que les deux sourcils ont une apparence finale cohérente et équilibrée.",
    benefits: ["Symétrie parfaite", "Densité uniforme", "Cohérence assurée"],
  },
  {
    id: 25,
    title: "Visualisation du sourcil supérieur completé",
    duration: "10s",
    image: "/images/step 25.png",
    video: "/videos/step 25.mov",
    description: "Cette vue montre le sourcil supérieur immédiatement après la fin de la deuxième passe. La densité ajoutée est maintenant clairement visible, et son apparence correspond à celle du sourcil inférieur déjà terminé, confirmant l'obtention d'un résultat harmonieux.",
    benefits: ["Densité visible", "Correspondance parfaite", "Résultat harmonieux"],
  },
  {
    id: 26,
    title: "Inspection finale du travail completé",
    duration: "5s",
    image: "/images/step 26.png",
    video: "/videos/step 26.mov",
    description: "Une vue d'ensemble finale du mannequin de pratique présente les deux sourcils completés, côte à côte. C'est l'aboutissement de l'exercice, permettant une évaluation finale de la symétrie, de la forme, de la qualité des traits et du résultat esthétique global.",
    benefits: ["Vue d'ensemble", "Évaluation finale", "Résultat esthétique"],
  },
]

export default function MicroneedlingTreatmentGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false)
  const [showFullScreenImage, setShowFullScreenImage] = useState(false)

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
    setShowFullScreenImage(false)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setProgress(0)
    setIsPlaying(false)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
    setShowFullScreenImage(false)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
      setShowFullScreenImage(false)
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
      setShowFullScreenImage(false)
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
          Entraînez-vous! terminée avec succès
        </p>
        <p className="text-base font-quicksand text-blue-700 mb-4">Toutes les étapes ont été complétées</p>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mx-4">
          <p className="text-sm font-quicksand text-gray-600 mb-1">Formation réalisée avec</p>
          <h3 className="text-xl font-bold font-saeada text-brand-gradient">Guide Professionnel Microblading</h3>
          <p className="text-xs font-quicksand text-gray-500 mt-1">Méthode certifiée • Mannequin silicone</p>
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
          45 Minutes
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
                Entraînez-vous!
              </h1>
              <div className="flex flex-wrap gap-2 text-sm font-quicksand text-gray-600">
                <span>Entraînement sur mannequin silicone</span>
                <span className="hidden sm:inline">•</span>
                <span>26 étapes essentielles</span>
                <span className="hidden sm:inline">•</span>
                <span>Avant pratique clientèle</span>
                <span className="hidden sm:inline">•</span>
                <span>Matériel requis</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                {currentStep + 1}/{treatmentSteps.length}
              </span>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base font-semibold font-quicksand text-gray-700">45min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice Banner - Only show on first step */}
        {currentStep === 0 && (
          <div className="mx-2 md:mx-4 mb-4">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-amber-600 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-800">
                    <strong>Mannequin silicone requis</strong> - À acheter séparément
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Cette formation nécessite un mannequin silicone pour la pratique avant de travailler sur de vrais clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 p-2 md:p-4">
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
                  <div className="w-64 h-64 rounded-xl overflow-hidden shadow-md">
                    {currentStepData.image && (
                      <Image
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={`${currentStepData.title} illustration`}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setShowFullScreenImage(true)}
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
                    className="relative w-full h-80 sm:h-96 md:h-[32rem] rounded-3xl overflow-hidden shadow-lg bg-gray-100"
                  >
                    {currentStepData.video ? (
                      <video
                        key={currentStepData.video}
                        className="w-full h-full object-contain"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        controls={false}
                      >
                        <source src={currentStepData.video} type="video/quicktime" />
                        <source src={currentStepData.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : currentStepData.image ? (
                      <Image
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={currentStepData.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setShowFullScreenImage(true)}
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
        </div>

        <div className="md:hidden bg-white mx-2 mb-2 rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="text-center mb-3">
              <h2 className="text-xl font-bold font-saeada text-gray-800 mb-2">{currentStepData.title}</h2>
              <span className="inline-block px-4 py-2 bg-brand-gradient text-white rounded-full text-sm font-bold font-quicksand">
              {currentStepData.duration}
            </span>
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

        {/* Full Screen Image Modal */}
        <AnimatePresence>
          {showFullScreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setShowFullScreenImage(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowFullScreenImage(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <X size={32} />
                </button>
                <Image
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <h3 className="text-white text-lg font-semibold">{currentStepData.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
