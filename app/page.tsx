"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GrowGardenRewards() {
  const [username, setUsername] = useState("")
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isValidUser, setIsValidUser] = useState(false)
  const [checking, setChecking] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showOffers, setShowOffers] = useState(false)
  const [offers, setOffers] = useState<any[]>([])
  const [offersLoading, setOffersLoading] = useState(false)
  const [leadsCompleted, setLeadsCompleted] = useState(false)
  const [showWarning, setShowWarning] = useState("")
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)

  const maxSelections = 3

  const gardenItems = [
    { id: 1, name: "Bone Blossom", image: "https://static.wikia.nocookie.net/growagarden/images/3/3c/BoneBlossomCrop.png" },
    { id: 2, name: "Burning Bud", image: "https://static.wikia.nocookie.net/growagarden/images/2/27/Burning_Bud_Product.PNG" },
    { id: 3, name: "Sugar Apple", image: "https://static.wikia.nocookie.net/growagarden/images/a/a7/SugarAppleIcon.png" },
    { id: 4, name: "Kitsune", image: "https://static.wikia.nocookie.net/growagarden/images/4/4d/Kitsune_.png" },
    { id: 5, name: "Red Fox", image: "https://static.wikia.nocookie.net/growagarden/images/d/d5/RedFox.png" },
    { id: 6, name: "T-Rex", image: "https://static.wikia.nocookie.net/growagarden/images/f/f8/T-Rex.png" },
    { id: 7, name: "Fennec Fox", image: "https://static.wikia.nocookie.net/growagarden/images/e/e8/FennecFoxIcon.png" },
    { id: 8, name: "Bald Eagle", image: "https://static.wikia.nocookie.net/growagarden/images/d/d2/BaldEagle.png" },
    {
      id: 9,
      name: "Red Dragon",
      image: "https://static.wikia.nocookie.net/growagarden/images/6/6e/RedDragonRender.png",
    },
    { id: 10, name: "Spinosaurus", image: "https://static.wikia.nocookie.net/growagarden/images/2/24/Spinosaurus.png" },
    { id: 11, name: "Dragonfly", image: "https://static.wikia.nocookie.net/growagarden/images/c/c9/DragonflyIcon.png" },
    { id: 12, name: "Queen Bee", image: "https://static.wikia.nocookie.net/growagarden/images/7/7a/Queen_bee.png" },
    { id: 13, name: "Blood Owl", image: "https://static.wikia.nocookie.net/growagarden/images/0/00/Blood_Owl_Icon.png" },
    {
      id: 14,
      name: "kiwi",
      image: "https://static.wikia.nocookie.net/growagarden/images/e/ea/Kiwi.png",
    },
    { id: 15, name: "x10 Candy Blossom", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/6_candy_blossom.png" },
    { id: 16, name: "Raccoon", image: "https://static.wikia.nocookie.net/growagarden/images/5/54/Raccon_Better_Quality.png" },
    { id: 17, name: "Hedgehog Pet", image: "https://static.wikia.nocookie.net/growagarden/images/4/46/HedgehogPet.png" },
    { id: 18, name: "282T¢(seckles)", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/Plants1.png" },
    { id: 19, name: "Night Owl", image: "https://static.wikia.nocookie.net/growagarden/images/3/3e/NightOwlPic.png" },
    { id: 20, name: "Hamster", image: "https://static.wikia.nocookie.net/growagarden/images/c/c5/HamsterIcon.webp" },
    {
      id: 21,
      name: "Chicken Zombie",
      image: "https://static.wikia.nocookie.net/growagarden/images/b/be/Chicken_Zombie_Icon.png",
    },
    { id: 22, name: "Firefly", image: "https://static.wikia.nocookie.net/growagarden/images/c/cd/Again.png" },
    { id: 23, name: "Owl", image: "https://static.wikia.nocookie.net/growagarden/images/4/46/Owlpng.png" },
    { id: 24, name: "Golden Bee", image: "https://static.wikia.nocookie.net/growagarden/images/e/e8/GoldenBee.png" },
    { id: 25, name: "Echo Frog", image: "https://static.wikia.nocookie.net/growagarden/images/3/30/Echo_frog.png" },
    { id: 26, name: "Cooked Owl", image: "https://static.wikia.nocookie.net/growagarden/images/f/fc/Cooked_Owl.png" },
    { id: 27, name: "Cow", image: "https://static.wikia.nocookie.net/growagarden/images/8/84/Cow.png" },
    { id: 28, name: "Polar Bear", image: "https://static.wikia.nocookie.net/growagarden/images/2/25/Polarbear.png" },
    { id: 29, name: "Sea Otter", image: "https://static.wikia.nocookie.net/growagarden/images/c/c3/Sea_Otter.png" },
    {
      id: 30,
      name: "Silver Monkey",
      image: "https://static.wikia.nocookie.net/growagarden/images/a/a7/Silvermonkey.png",
    },
    { id: 31, name: "Mushroom", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/mushroom%20(1).webp" },
    { id: 32, name: "Grape", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/grape%20(1).webp" },
    { id: 33, name: "Friendship Pot", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/Friendship_Pot.webp" },
    { id: 34, name: "Ember Lily", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/ember.webp" },
    { id: 35, name: "Disco Bee", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/disco.webp" },
    { id: 36, name: "Butterfly Pet", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/butterfly.webp" },
    { id: 37, name: "Mango", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/mango.webp" },
    { id: 38, name: "Dragonfruit", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/dragonfruit.webp" },
    { id: 39, name: "Cactus", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/cactus.webp" },
    { id: 40, name: "Coconut", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/coconut.webp" },
    { id: 41, name: "Bamboo", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/bamboo.webp" },
    { id: 42, name: "Apple", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/apple.webp" },
    { id: 43, name: "Pumpkin", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/pumpkin.webp" },
    { id: 44, name: "Watermelon", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/watermelon.webp" },
    { id: 45, name: "Daffodil", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/daffodil.webp" },
    { id: 46, name: "Corn", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/corn.webp" },
    { id: 47, name: "Tomato", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/tomato.webp" },
    { id: 48, name: "Orange", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/orange.webp" },
    { id: 49, name: "Blueberry", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/blueberry.webp" },
    { id: 50, name: "Carrot", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/carrot.webp" },
    { id: 51, name: "Flower Pack", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/flowerpack.webp" },
    { id: 52, name: "Beanstalk", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/beanstalk.png" },
    { id: 53, name: "Strawberry", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/Strawberry.webp" },
    { id: 54, name: "Super Seed", image: "https://cdn.jsdelivr.net/gh/monorolls/grow@main/Super_Seed.webp" },
    { id: 55, name: "Moon Blossom", image: "https://static.wikia.nocookie.net/growagarden/images/7/77/MoonBlossomBetterQuality.png" },
  ]

  const loadingPhases = [
    { text: "Connecting to servers...", color: "text-blue-400" },
    { text: "Successfully Connected.", color: "text-green-400" },
    { text: "Finding Username...", color: "text-blue-400" },
    { text: "Username Found.", color: "text-green-400" },
    { text: "Generating Items...", color: "text-blue-400" },
    { text: "Starting Transfer...", color: "text-green-400" },
    { text: "Verifying Human Activity...", color: "text-blue-400" },
    { text: "Human Verification Required.", color: "text-red-400" },
  ]

  const checkUsername = async () => {
    if (!username) return
    setChecking(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsValidUser(username.length > 2)
    } catch (err) {
      console.error("Username check failed:", err)
      setIsValidUser(false)
    } finally {
      setChecking(false)
    }
  }

  const fetchRobloxProfile = async (username: string) => {
    try {
      // Use CORS proxy to fetch Roblox profile
      const proxyUrl = "https://corsproxy.io/?"
      const searchUrl = `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(username)}`
      const searchResponse = await fetch(proxyUrl + searchUrl)
      const searchData = await searchResponse.json()

      if (!searchData.data || searchData.data.length === 0) {
        throw new Error("User not found")
      }

      const user = searchData.data.find((u: any) => u.name.toLowerCase() === username.toLowerCase())
      if (!user) throw new Error("User not found")

      // Get avatar
      const avatarUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=420x420&format=Png`
      const avatarResponse = await fetch(proxyUrl + avatarUrl)
      const avatarData = await avatarResponse.json()

      setProfileData({
        username: user.name,
        avatar: avatarData.data[0].imageUrl,
      })
    } catch (error) {
      console.error("Profile fetch failed:", error)
      setProfileData({
        username: username,
        avatar: "/placeholder.svg?height=120&width=120",
      })
    }
  }

  const handleCardClick = (id: number) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id))
    } else {
      if (selectedCards.length >= maxSelections) {
        setShowWarning("مسموحلك تختار 3 حاجات بس")
        setTimeout(() => setShowWarning(""), 3000)
        return
      }
      setSelectedCards([...selectedCards, id])
    }
  }

  const handleGenerate = async () => {
    if (!username) {
      setShowWarning("اكتب اليوزر نيم بتاعك")
      setTimeout(() => setShowWarning(""), 3000)
      return
    }
    if (selectedCards.length === 0) {
      setShowWarning("!لازم تختار حاجة واحدة على الأقل!")
      setTimeout(() => setShowWarning(""), 3000)
      return
    }

    setShowVerification(true)

    // Start loading sequence
    for (let i = 0; i < loadingPhases.length; i++) {
      setLoadingPhase(i)
      await new Promise((resolve) => setTimeout(resolve, i === 1 || i === 3 ? 2000 : 1500))

      if (i === 3) {
        // Show profile confirmation
        setShowProfile(true)
        await fetchRobloxProfile(username)
        break
      }
    }
  }

  const confirmProfile = async (confirmed: boolean) => {
    if (confirmed) {
      setShowProfile(false)
      // Continue loading sequence
      for (let i = 4; i < loadingPhases.length; i++) {
        setLoadingPhase(i)
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
      // Show offers
      setShowOffers(true)
      loadOffers()
    } else {
      setShowVerification(false)
      setShowProfile(false)
      setLoadingPhase(0)
      setUsername("")
    }
  }

  const loadOffers = () => {
    setOffersLoading(true)
    const callbackName = `offerCallback_${Date.now()}`

    // @ts-ignore
    window[callbackName] = (data: any) => {
      setOffers(data.slice(0, 4))
      setOffersLoading(false)
      // @ts-ignore
      delete window[callbackName]
      const script = document.querySelector(`script[src*="${callbackName}"]`)
      if (script) document.body.removeChild(script)
    }

    const script = document.createElement("script")
    script.src = `https://d3o07fqjkwc0s0.cloudfront.net/public/offers/feed.php?user_id=462773&api_key=02632e1dfd41f30fbd0c4230f53d3fb4&callback=${callbackName}`
    document.body.appendChild(script)
  }

  const checkLeads = () => {
    const callbackName = `leadCallback_${Date.now()}`

    // @ts-ignore
    window[callbackName] = (leads: any[]) => {
      if (leads.length > 0) {
        setLeadsCompleted(true)
        setShowVerification(false)
        setShowOffers(false)
        alert("✅ Offer completed! Items successfully generated! Check your game inventory.")
      }
      // @ts-ignore
      delete window[callbackName]
      const script = document.querySelector(`script[src*="${callbackName}"]`)
      if (script) document.body.removeChild(script)
    }

    const script = document.createElement("script")
    script.src = `https://d3o07fqjkwc0s0.cloudfront.net/public/external/check2.php?testing=0&callback=${callbackName}`
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (showOffers && !leadsCompleted) {
      const interval = setInterval(checkLeads, 15000)
      return () => clearInterval(interval)
    }
  }, [showOffers, leadsCompleted])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-16 h-8 bg-white rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-20 right-32 w-20 h-10 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-14 h-7 bg-white rounded-full opacity-50 animate-bounce"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {!showVerification ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                🐝 Claim - Grow a Garden 🌻
              </h1>
              

              <div className="max-w-md mx-auto mb-4">
                <Input
                  type="text"
                  placeholder="دخل اليوزر نيم بتاعك"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setIsValidUser(false)
                  }}
                  onBlur={checkUsername}
                  className="text-center text-lg p-4 rounded-lg border-2 border-white/30 bg-white/90 backdrop-blur-sm"
                  disabled={checking}
                />
                {checking && <p className="text-yellow-200 mt-2 animate-pulse">🔍 جاري التحقق من اسم المستخدم...</p>}
                {username && !checking && isValidUser && (
                  <p className="mt-2 font-semibold text-green-200">اسم المستخدم صحيح ✅</p>
                )}
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!username || selectedCards.length === 0 || checking}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? "Checking..." : "Claim!"}
              </Button>
            </div>

            {/* Warnings */}
            {showWarning && (
              <Alert className="max-w-md mx-auto mb-6 bg-red-100 border-red-400">
                <AlertDescription className="text-red-700 font-semibold text-center">{showWarning}</AlertDescription>
              </Alert>
            )}

            {/* Instructions */}
            <p className="text-center text-white text-lg mb-6 font-semibold">
              اختار الحاجات اللي عايز تاخدها (بحد أقصى {maxSelections}):
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
              {gardenItems.map((item) => (
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedCards.includes(item.id)
                      ? "ring-4 ring-yellow-400 bg-yellow-50 scale-110 shadow-xl shadow-yellow-400/50"
                      : "hover:shadow-lg bg-white/90 backdrop-blur-sm"
                  }`}
                  onClick={() => handleCardClick(item.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-4 h-4 rounded-full mx-auto mb-3 transition-colors ${
                        selectedCards.includes(item.id) ? "bg-yellow-400" : "bg-gray-300"
                      }`}
                    ></div>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 mx-auto mb-3 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                    <h3 className="font-bold text-sm text-gray-800 leading-tight">{item.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Verification Modal */
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
              {!showOffers ? (
                <>
                  {/* Loading Phase */}
                  <div className="p-8 text-center">
                    <img
                      src="https://static.wikia.nocookie.net/growagarden/images/4/4a/Site-favicon.ico"
                      alt="Logo"
                      className="w-24 h-24 mx-auto mb-6"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=96&width=96"
                      }}
                    />

                    {!showProfile ? (
                      <>
                        <div className="flex justify-center space-x-2 mb-6">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                i <= Math.floor(loadingPhase / 2)
                                  ? "bg-blue-500"
                                  : i === Math.floor(loadingPhase / 2) + 1
                                    ? "bg-blue-300 animate-bounce"
                                    : "bg-gray-300"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <p
                          className={`text-lg font-semibold mb-4 ${loadingPhases[loadingPhase]?.color || "text-gray-600"}`}
                        >
                          {loadingPhases[loadingPhase]?.text || "Loading..."}
                        </p>
                      </>
                    ) : (
                      /* Profile Confirmation */
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">تأكد من البروفايل بتاعك</h3>
                        {profileData && (
                          <div className="space-y-4">
                            <img
                              src={profileData.avatar || "/placeholder.svg"}
                              alt="User Avatar"
                              className="w-24 h-24 rounded-full mx-auto border-4 border-blue-400"
                            />
                            <p className="text-lg font-semibold text-blue-600">{profileData.username}</p>
                            <p className="text-gray-600">هو ده البروفايل بتاعك؟</p>
                            <div className="flex space-x-4 justify-center">
                              <Button
                                onClick={() => confirmProfile(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                              >
                                Yes
                              </Button>
                              <Button onClick={() => confirmProfile(false)} variant="destructive" className="px-6 py-2">
                                No
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Offers Section */
                <>
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 text-center">
                    <h2 className="text-xl font-bold mb-2">Complete 2 quests to claim! 📝</h2>
                    <p className="text-sm opacity-90">
                      If a quest isn't working, please try another one. If you're having issues with every quest, please
                      try on a different device! 📲🖥️
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {offersLoading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin text-3xl mb-2">⚙️</div>
                          <p className="text-gray-600 font-semibold">Loading offers...</p>
                        </div>
                      ) : offers.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-600 font-semibold">😔 No offers available.</p>
                        </div>
                      ) : (
                        offers.map((offer, index) => (
                          <a
                            key={index}
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white p-4 rounded-lg border-2 border-purple-800 hover:border-purple-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <div className="font-bold text-base">🎯 {offer.anchor}</div>
                            <div className="text-sm opacity-90 mt-1">{offer.conversion}</div>
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Fredoka', sans-serif;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
