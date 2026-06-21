import { setRequestLocale } from 'next-intl/server'
import { getLatestArticles } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

const HOME_SECTION_IDS = [
  'beginner-guide',
  'apotheosis-crafting',
  'tools-weapons',
  'storage-inventory',
  'qualia-base-building',
  'world-regions',
  'creatures-enemies',
  'mobility-gear',
  'farming-growth',
  'best-early-unlocks',
  'achievement-tracker',
  'singleplayer-faq',
  'steam-deck-controller',
  'settings-accessibility',
  'updates-patch-notes',
  'crash-fix',
] as const

const HOME_ANCHOR_MARKERS = [
  'href="#beginner-guide"',
  'href="#apotheosis-crafting"',
  'href="#tools-weapons"',
  'href="#storage-inventory"',
  'href="#qualia-base-building"',
  'href="#world-regions"',
  'href="#creatures-enemies"',
  'href="#mobility-gear"',
  'href="#farming-growth"',
  'href="#best-early-unlocks"',
  'href="#achievement-tracker"',
  'href="#singleplayer-faq"',
  'href="#steam-deck-controller"',
  'href="#settings-accessibility"',
  'href="#updates-patch-notes"',
  'href="#crash-fix"',
] as const

const HOME_SECTION_MARKERS = [
  '<section id="beginner-guide">',
  '<section id="apotheosis-crafting">',
  '<section id="tools-weapons">',
  '<section id="storage-inventory">',
  '<section id="qualia-base-building">',
  '<section id="world-regions">',
  '<section id="creatures-enemies">',
  '<section id="mobility-gear">',
  '<section id="farming-growth">',
  '<section id="best-early-unlocks">',
  '<section id="achievement-tracker">',
  '<section id="singleplayer-faq">',
  '<section id="steam-deck-controller">',
  '<section id="settings-accessibility">',
  '<section id="updates-patch-notes">',
  '<section id="crash-fix">',
] as const

const HOME_THEME_COLOR_TOKEN = 'hsl(var(--nav-theme))'

const HOME_TOOL_ICON_NAMES: Array<keyof typeof import('lucide-react')> = [
  'BookOpen',
  'Sparkles',
  'Hammer',
  'Package',
  'Home',
  'Eye',
  'AlertTriangle',
  'ArrowRight',
  'TrendingUp',
  'Star',
  'ClipboardCheck',
  'MessageCircle',
  'Gamepad2',
  'Settings',
  'Clock',
  'Shield',
]

const HOME_EXTERNAL_LINKS = {
	video: {
		id: '14Adm06VEBE',
		title: 'ROBLOX KICK A LUCKY BLOCK!',
	},
	links: {
		playRoblox: 'https://www.roblox.com/games/89469502395769/Kick-a-Lucky-Block',
		joinDiscord: 'https://discord.com/invite/tfwUnqvdUX',
		developerGroup: 'https://www.roblox.com/communities/1041977165/No-More-Flops',
		youtubeVideo: 'https://www.youtube.com/watch?v=14Adm06VEBE',
		officialStatsApi: 'https://games.roblox.com/v1/games?universeIds=10004244222',
		officialVotesApi: 'https://games.roblox.com/v1/games/votes?universeIds=10004244222',
		rolimonsTracker: 'https://www.rolimons.com/game/89469502395769',
	},
}

function validateHomePageContracts() {
  if (
    HOME_SECTION_IDS.length !== HOME_ANCHOR_MARKERS.length ||
    HOME_SECTION_IDS.length !== HOME_SECTION_MARKERS.length
  ) {
    throw new Error('Homepage navigation and section markers are out of sync.')
  }

  if (!HOME_THEME_COLOR_TOKEN.includes('--nav-theme')) {
    throw new Error('Homepage theme token must reference --nav-theme.')
  }

  if (HOME_TOOL_ICON_NAMES.length !== HOME_SECTION_IDS.length) {
    throw new Error('Tools Grid icon count must match section count.')
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
	const { locale } = await params
	setRequestLocale(locale)
  validateHomePageContracts()

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap: ModuleLinkMap = {}

	return (
		<HomePageClient
			latestArticles={latestArticles}
			moduleLinkMap={moduleLinkMap}
			locale={locale}
			homeExternalLinks={HOME_EXTERNAL_LINKS}
		/>
	)
}
