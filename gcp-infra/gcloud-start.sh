gcloud compute instances resume k8s-control-plane --zone=asia-south2-a
gcloud compute instances resume k8s-worker-1 --zone=asia-south2-a
gcloud compute instances resume k8s-worker-2 --zone=asia-south2-a

gcloud sql instances patch statusbus-postgres --activation-policy=ALWAYS
