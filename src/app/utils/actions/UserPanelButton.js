import { useRouter } from 'next/navigation';
const router = useRouter()

export const UserPanelButton = () => {
  router.push('/login')
}